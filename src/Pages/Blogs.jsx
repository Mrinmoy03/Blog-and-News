import React, { useEffect, useState } from "react";
import "../styles/Blogs.css";
import noImg from "../assets/images/no-img.png";
import userImg from "../assets/images/user.jpg";

const Blogs = ({ onBack, onCreateBlog, editPost, isEditing }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(""); // New state for image name
  const [title, setTitle] = useState("");
  const [content, setContetnt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);

  useEffect(()=>{
        if(isEditing && editPost){
         setImage(editPost.image)
         setTitle(editPost.title)
         setContetnt(editPost.content) 
         setShowForm(true) 
        }else{
          setImage(null)
          setTitle("")
          setContetnt("") 
          setShowForm(false) 
        }
  },[isEditing, editPost])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {

      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024
      if(file.size > maxSize){
        alert('File Size exceeds 1MB')
        return
      }
      setImageName(file.name); 
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  };

  const handleContentChange = (e) => {
    setContetnt(e.target.value);
    setContentValid(true); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      if (!title) setTitleValid(false);
      if (!content) setContentValid(false);
      return;
    }

    const newBlog = {
      image: image || noImg,
      title,
      content,
    };
    onCreateBlog(newBlog, isEditing);
    setImage(null);
    setImageName(""); 
    setTitle("");
    setContetnt("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="user iamge" />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {submitted && <p className="submission-message">Post Submitted!</p>}

        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i> Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {image && (
                <div className="image-preview">
                  <img src={image} alt="preview" />
                  <p>{imageName}</p>
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Add Title (Max 60 Characters)"
              className={`title-input ${!titleValid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
              maxLength={60}
            />
            <textarea
              className={`text-input ${!contentValid ? "invalid" : ""}`}
              placeholder="Add Text"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        <button className="blogs-close-btn" onClick={onBack}>
          back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
