import React from "react";

import "../styles/NewsModal.css";
import "../styles/modal.css";

const NewsModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }


  const getTrimmedContent = (content) => {
    if (!content) return "No content available...";

  
    const cleanedContent = content.replace(/\[\+\d+\schars\]/g, "").trim();

    const words = cleanedContent.split(" ");
    if (words.length <= 50) return cleanedContent;

    return words.slice(0, 50).join(" ") + "....";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              src={article.image || demoImg}
              alt={article.title}
              className="modal-image"
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">Source: {article.source.name}</p>
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleString("en-us", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="modal-content-text">
              {getTrimmedContent(article.content)}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-link"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
