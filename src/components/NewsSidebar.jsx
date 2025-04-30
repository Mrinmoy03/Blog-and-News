import React from "react";
import userImg from "../assets/images/user.jpg";

const NewsSidebar = ({ categories, selectedCategory, handleCategoryClick, setShowBookmarksModal,
  onShowBlogs  
 }) => (
  <div className="navbar">
    <div className="user" onClick={onShowBlogs}>
      <img src={userImg} alt="user" />
      <p>Mary's Blog</p>
    </div>
    <nav className="categories">
      <h1 className="nav-heading">Categories</h1>
      <div className="nav-links">
        {categories.map((category) => (
          <a
            href="#"
            key={category}
            className={`nav-link ${selectedCategory === category ? "active-category" : ""}`}
            onClick={(e) => handleCategoryClick(e, category)}
          >
            {category}
          </a>
        ))}
        <a href="#" className="nav-link" onClick={() => setShowBookmarksModal(true)}>
          Bookmarks <i className="fa-solid fa-bookmark"></i>
        </a>
      </div>
    </nav>
  </div>
);

export default NewsSidebar;
