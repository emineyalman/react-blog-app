import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BlogDetail.css'
import {  doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BlogDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [singleBlog, setSingleBlog] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      setLoading(true)
      setError(null)
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      
      console.log("Document ID:", id);
      console.log("Document exists:", docSnap.exists());
      console.log("Document data:", docSnap.data());
      
      if (docSnap.exists()) {
        setSingleBlog(docSnap.data());
      } else {
        setError("Blog bulunamadı!")
      }
    } catch (error) {
      console.error("Firestore Error:", error);
      setError("Blog yüklenirken bir hata oluştu: " + error.message)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData()
  }, [id])

  if (loading) {
    return <div className="blog-message">Yükleniyor...</div>
  }

  if (error) {
    return <div className="blog-message error">{error}</div>
  }

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-container">
        <div className="blog-header">
          <div className="header-content">
            <h1 className="blog-title">{singleBlog.title}</h1>
            <button 
              className="edit-button"
              onClick={() => navigate(`/editblog/${id}`)}
            >
              <i className="fas fa-edit"></i> Düzenle
            </button>
          </div>
          
          <div className="blog-meta">
            <div className="author-info">
              <i className="fas fa-user"></i>
              <span className="blog-author">{singleBlog.author}</span>
              <i className="fas fa-calendar-alt"></i>
              <span className="blog-date">
                {singleBlog.createdAt?.toDate().toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="blog-content">
          {singleBlog.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="blog-footer">
          <div className="blog-meta-footer">
            <div className="category-section">
              <i className="fas fa-folder"></i>
              <span className="blog-category">{singleBlog.category}</span>
            </div>
            <div className="blog-tags">
              <i className="fas fa-tags"></i>
              {singleBlog.tags?.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail