import React from 'react'
import { useParams } from 'react-router-dom'
import './BlogDetail.css'

const BlogDetail = () => {
  const {id} = useParams()
  
  return (
    <div className="blog-detail-container">
      <div className="blog-header">
        <h1 className="blog-title">Blog Başlığı</h1>
        <div className="blog-meta">
          <span className="blog-date">23 Mart 2024</span>
          <span className="blog-author">Yazar: John Doe</span>
        </div>
      </div>
      
      <div className="blog-cover-image">
        <img src="https://placeholder.com/800x400" alt="Blog kapak görseli" />
      </div>
      
      <div className="blog-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <h2>Alt Başlık</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      
      <div className="blog-tags">
        <span className="tag">Teknoloji</span>
        <span className="tag">Yazılım</span>
        <span className="tag">Web Geliştirme</span>
      </div>
    </div>
  )
}

export default BlogDetail