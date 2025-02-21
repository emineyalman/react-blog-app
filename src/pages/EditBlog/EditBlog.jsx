import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import './EditBlog.css'

// Tarih formatlaması için yardımcı fonksiyon
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    // Eğer timestamp bir Firestore Timestamp ise
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Eğer timestamp bir string ise
    if (typeof timestamp === 'string') {
      const date = new Date(timestamp);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Eğer timestamp bir Date objesi ise
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    return 'Geçersiz tarih';
  } catch (error) {
    console.error('Tarih formatlanırken hata:', error);
    return 'Geçersiz tarih';
  }
};

const EditBlog = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    category: '',
    tags: []
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const getData = async () => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        setError("Blog not found!")
      }
    } catch (error) {
      console.error("Firestore Error:", error);
      setError("Error loading blog: " + error.message)
    } finally {
      setLoading(false)
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        ...blog,
        updatedAt: new Date().toISOString()
      });
      setError(null);
      // Başarılı güncelleme sonrası yönlendirme yapabilirsiniz
      // navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      setError("Blog güncellenirken bir hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bu blogu silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, "blogs", id));
      navigate('/'); // Ana sayfaya yönlendirme
    } catch (error) {
      console.error("Silme hatası:", error);
      setError("Blog silinirken bir hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData()
  }, [id])

  return (
    <div className="edit-blog-wrapper">
      <div className="edit-blog-container">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="input-group">
            <input
              type="text"
              className="blog-title-input"
              placeholder="Enter your title..."
              value={blog.title || ''}
              onChange={(e) => setBlog({...blog, title: e.target.value})}
            />
          </div>
          
          <div className="input-group">
            <textarea
              className="blog-content-input"
              placeholder="Tell your story..."
              value={blog.content || ''}
              onChange={(e) => setBlog({...blog, content: e.target.value})}
            />
          </div>

          <div className="meta-inputs">
            <select
              className="meta-input category-select"
              value={blog.category || ''}
              onChange={(e) => setBlog({...blog, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="DevOps">DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Blockchain">Blockchain</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              className="meta-input"
              placeholder="Tags (comma separated)"
              value={blog.tags ? blog.tags.join(', ') : ''}
              onChange={(e) => setBlog({...blog, tags: e.target.value.split(',')})}
            />
          </div>

          <div className="blog-meta">
            <span className="blog-date">
              Oluşturulma Tarihi: {formatDate(blog?.createdAt)}
            </span>
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className={`btn save-button ${loading ? 'disabled' : ''}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button 
              type="button" 
              className="btn cancel-button"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className={`btn delete-button ${loading ? 'disabled' : ''}`}
              onClick={handleDelete}
              disabled={loading}
            >
              {isHovered ? 'Are you sure?' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog