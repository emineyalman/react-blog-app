import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import './Profile.css';


const Profile = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kullanıcının bloglarını getir
  const getUserBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), where("author", "==", "currentUser")); // author'ı kendi auth sisteminize göre değiştirin
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
    getUserBlogs();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h1>My Profile</h1>
          <p>Welcome back! Here are your blog posts.</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="blog-stats">
          <div className="stat-card">
            <h3>Total Posts</h3>
            <p>{userBlogs.length}</p>
          </div>
        </div>

        <div className="my-blogs">
          <h2>My Blog Posts</h2>
          {userBlogs.length === 0 ? (
            <div className="no-blogs">
              <p>You haven't created any blog posts yet.</p>
            </div>
          ) : (
            <div className="blogs-grid">
              {userBlogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                  <div className="blog-card-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.content.substring(0, 150)}...</p>
                    <div className="blog-card-footer">
                      <span className="blog-category">{blog.category}</span>
                      <span className="blog-date">
                        {blog.createdAt ? blog.createdAt.toLocaleDateString('tr-TR') : ''}
                      </span>
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
