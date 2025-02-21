import React, { useState } from "react";
import './NewBlog.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const addData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: title,
        content: content,
        author: author,
        category: category,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date()
      });
      console.log("Blog post added successfully, ID:", docRef.id);
      setTitle("");
      setContent("");
      setAuthor("");
      setCategory("");
      setTags("");
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  return (
    <div className="blog-container">
      <form onSubmit={addData} className="blog-form">
        <h2 className="form-title">Create New Blog Post</h2>
        <div className="form-group">
          <input
            className="form-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter Blog Title"
            type="text"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-input form-textarea"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            name="content"
            rows="10"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Enter Author Name"
            type="text"
            name="author"
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-input form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
            name="category"
            required
          >
            <option value="">Select a category</option>
            <option value="programming">Programming</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="news">News</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input
            className="form-input"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Enter tags (comma separated)"
            type="text"
            name="tags"
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
}

export default NewBlog;