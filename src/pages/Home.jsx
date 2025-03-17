import React, { useEffect, useState  } from 'react'
import './Home.css' // CSS dosyasını oluşturmanız gerekecek
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import TextClip from './TextClip';

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert the Firestore timestamp to a JavaScript Date object
        const createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000) : null;
        blogsArray.push({ 
          id: doc.id, 
          ...data,
          createdAt: createdAt 
        });
      });
      setAllBlogs(blogsArray);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Blog Yazıları</h1>
      <div className="blog-grid">
        {allBlogs.map((blog, index) => (
          <div 
            key={blog.id || index} 
            className="blog-card"
            onClick={() => navigate(`/blogdetail/${blog.id}`)}
          >
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p className="blog-excerpt">{TextClip(blog.content)}</p>
              <div className="blog-meta">
                <span className="blog-category">{blog.category}</span>
                <span className="blog-date">
                  {blog.createdAt ? blog.createdAt.toLocaleDateString('tr-TR') : ''}
                </span>
                <span className="blog-author">{blog.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home