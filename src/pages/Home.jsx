import React, { useEffect, useState  } from 'react'
import './Home.css' // CSS dosyasını oluşturmanız gerekecek
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

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
     <button style={{
       position: "fixed",
       right: "30px",
       top: "30px",
       padding: "15px 25px",
       borderRadius: "8px",
       backgroundColor: "#0056b3",
       color: "white", 
       border: "none",
       cursor: "pointer",
       boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
       fontSize: "16px",
       fontWeight: "bold",
       zIndex: 1000,
       transition: "all 0.3s ease"
     }} onClick={() => navigate("/newblog")}>
       Add New Blog
     </button>
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
              <p className="blog-excerpt">{blog.content}</p>
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