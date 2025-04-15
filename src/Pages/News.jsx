import React, { useEffect, useState } from "react";
import Weather from "../components/Weather";
import Calender from "../components/Calender";
import "../styles/news.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModal from "../components/NewsModal";
import Bookmarks from "../components/Bookmarks";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = "";

        if (searchQuery) {
          url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=f7c51571c76dd0c1362c1c536bbe40c8`;
        } else if (selectedCategory === "general") {
          url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=f7c51571c76dd0c1362c1c536bbe40c8`;
        } else {
          url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=f7c51571c76dd0c1362c1c536bbe40c8`;
        }

        const response = await axios.get(url);
        const fetchedNews = response.data.articles.map((article) => ({
          ...article,
          image: article.image || noImg,
        }));

        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));
      } catch (error) {
        console.error("Error fetching news:", error.message);
      }
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSearchQuery("");
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some(
        (bookmark) => bookmark.title === article.title
      );
      return isBookmarked
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
    });
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user">
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
                  className={`nav-link ${
                    selectedCategory === category ? "active-category" : ""
                  }`}
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarksModal(true)}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>

        <div className="news-section">
          <div
            className="headline"
            onClick={() => handleArticleClick(headline)}
          >
            {headline ? (
              <>
                <img src={headline.image} alt="Headline" />
                <h2 className="headline-title">
                  {headline.title}
                  <i
                    className={`fa-bookmark bookmark ${
                      bookmarks.some(
                        (bookmark) => bookmark.title === headline.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
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
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`fa-bookmark bookmark ${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
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

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmarks
          show={showBookmarksModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModal(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />

        <div className="my-blogs">My Blogs</div>

        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>

      <footer className="news-footer">Footer</footer>
    </div>
  );
};

export default News;
