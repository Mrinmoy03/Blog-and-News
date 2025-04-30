import React from "react";
import BlogsModal from "./BlogsModal";
import noImg from "../assets/images/no-img.png";

const MyBlogs = ({
  blogs,
  onEditBlog,
  onDeleteBlog,
  selectedPost,
  setSelectedPost,
  showBlogModal,
  setShowBlogModal,
}) => {
  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogModal(true);
  };

  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="my-blogs">
      <h1 className="my-blogs-heading">My Blogs</h1>
      <div className="blog-posts">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="blog-post"
            onClick={() => handleBlogClick(blog)}
          >
            <img src={blog.image || noImg} alt={blog.title} />
            <h3>{blog.title}</h3>
            <div className="post-buttons">
              <button className="editpost" onClick={() => onEditBlog(blog)}>
                <i className="bx bxs-edit"></i>
              </button>
              <button
                className="delete-post"
                onClick={(e) => {
                  e.stopPropagation(); // prevent modal opening
                  onDeleteBlog(blog);
                }}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && showBlogModal && (
        <BlogsModal
          show={showBlogModal}
          blog={selectedPost}
          onClose={closeBlogModal}
        />
      )}
    </div>
  );
};

export default MyBlogs;
