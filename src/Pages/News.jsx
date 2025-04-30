import React, { useEffect, useState } from "react";
import Weather from "../components/Weather";
import Calender from "../components/Calender";
import "../styles/news.css";
import userImg from "../assets/images/user.jpg";
import blogImg1 from '../assets/images/blog1.jpg'
import blogImg2 from '../assets/images/blog2.jpg'
import blogImg3 from '../assets/images/blog3.jpg'
import blogImg4 from '../assets/images/blog4.jpg'
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import NewsModal from "../components/NewsModal";
import Bookmarks from "../components/Bookmarks";
import NewsHeader from "../components/NewsHeader";
import NewsSidebar from "../components/NewsSidebar";
import NewsSection from "../components/NewsSection";

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

const News = ({onShowBlogs}) => {
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

        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarks(savedBookmarks);
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
      const updatedBookmarks = prevBookmarks.some(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];

      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const handleBookmarkArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
    setShowBookmarksModal(false);
  };

  return (
    <div className="news">
      <NewsHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        
      />

      <div className="news-content">
        <NewsSidebar
          userImg={userImg}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
          setShowBookmarksModal={setShowBookmarksModal}
          onShowBlogs={onShowBlogs}
        />

        <NewsSection
          headline={headline}
          news={news}
          bookmarks={bookmarks}
          handleArticleClick={handleArticleClick}
          handleBookmarkClick={handleBookmarkClick}
        />

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />

        <Bookmarks
          show={showBookmarksModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModal(false)}
          onSelectArticle={handleBookmarkArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />

        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            <div className="blog-post">
              <img src={blogImg1} alt="Post Image" />
              <h3>Lorem ipsum dolor sit amet.</h3>
              <div className="post-buttons">
                <button className="editpost">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImg2} alt="Post Image" />
              <h3>Lorem ipsum dolor sit amet.</h3>
              <div className="post-buttons">
                <button className="editpost">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImg3} alt="Post Image" />
              <h3>Lorem ipsum dolor sit amet.</h3>
              <div className="post-buttons">
                <button className="editpost">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
           
          </div>

        </div>

        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>

      <footer className="news-footer">
        <p>
          <span>News and Blogs App</span>
        </p>
        <p>&copy; Created by Mrinmoy</p>
      </footer>
    </div>
  );
};

export default News;
