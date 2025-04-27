import React from "react";
import noImg from "../assets/images/no-img.png";

const NewsSection = ({ headline, news, handleArticleClick, bookmarks, handleBookmarkClick }) => (
  <div className="news-section">
    <div className="headline" onClick={() => handleArticleClick(headline)}>
      {headline ? (
        <>
          <img src={headline.image || noImg} alt="Headline" />
          <h2 className="headline-title">
            {headline.title}
            <i
              className={`fa-bookmark bookmark ${
                bookmarks.some((bookmark) => bookmark.title === headline.title) ? "fa-solid" : "fa-regular"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(headline);
              }}
            ></i>
          </h2>
        </>
      ) : (
        <p>Loading headline...</p>
      )}
    </div>

    <div className="news-grid">
      {news.map((article, index) => (
        <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
          <img src={article.image || noImg} alt={article.title} />
          <h3>
            {article.title}
            <i
              className={`fa-bookmark bookmark ${
                bookmarks.some((bookmark) => bookmark.title === article.title) ? "fa-solid" : "fa-regular"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(article);
              }}
            ></i>
          </h3>
        </div>
      ))}
    </div>
  </div>
);

export default NewsSection;
