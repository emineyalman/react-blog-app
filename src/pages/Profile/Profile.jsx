import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const getUserBlogs = async () => {
    try {
      if (!user) return;

      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, where("author", "==", user.email));
      const querySnapshot = await getDocs(q);
      const blogsArray = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000) : null;
        blogsArray.push({
          id: doc.id,
          ...data,
          createdAt: createdAt
        });
      });
      
      setUserBlogs(blogsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUserBlogs();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h2 className="text-3xl font-bold text-white">Please login to view your profile</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-loading flex items-center justify-center min-h-screen">
        <div className="loader w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={user.photoURL || 'https://via.placeholder.com/180'} 
          alt="Profile" 
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1 className="text-4xl font-bold mb-2">{user.displayName || user.email}'s Profile</h1>
          <p className="text-lg opacity-90">Welcome back! Here are your blog posts.</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="blog-stats grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="stat-card bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-gray-600">Total Posts</h3>
            <p className="text-3xl font-bold text-indigo-600">{userBlogs.length}</p>
          </div>
          <div className="stat-card bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold text-gray-600">Email</h3>
            <p className="text-md font-medium text-gray-800 break-all">{user.email}</p>
          </div>
        </div>

        <div className="my-blogs">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">My Blog Posts</h2>
          {userBlogs.length === 0 ? (
            <div className="no-blogs bg-white p-8 rounded-xl text-center">
              <p className="text-xl text-gray-600">You haven't created any blog posts yet.</p>
              <button
                onClick={() => navigate('/newblog')}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                style={{background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'}}
              >
                Create Your First Blog
              </button>
            </div>
          ) : (
            <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map((blog) => (
                <div key={blog.id} className="blog-card bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-102 transition-transform">
                  <div className="blog-card-content p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.content.substring(0, 150)}...</p>
                    <div className="blog-card-footer flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="blog-category px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                        {blog.category}
                      </span>
                      <span className="blog-date text-sm text-gray-500">
                        {blog.createdAt ? blog.createdAt.toLocaleDateString('tr-TR') : ''}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigate(`/blogdetail/${blog.id}`)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                        style={{background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'}}
                      >
                        View Blog
                      </button>
                      <button
                        onClick={() => navigate(`/editblog/${blog.id}`)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                        style={{background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'}}
                      >
                        Edit Blog
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;