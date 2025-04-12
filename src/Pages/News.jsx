import React, { useEffect, useState } from 'react'
import Weather from '../components/Weather'
import Calender from '../components/Calender'
import '../styles/news.css'
import userImg from '../assets/images/user.jpg'
import techImg from '../assets/images/tech.jpg'
import sportImg from '../assets/images/sports.jpg'
import scienceImg from '../assets/images/science.jpg'
import worldImg from '../assets/images/world.jpg'
import healthImg from '../assets/images/health.jpg'
import nationImg from '../assets/images/nation.jpg'
import axios from 'axios'

const News = () => {
  const [headline, setHeadline] = useState(null)
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = 'https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=f7c51571c76dd0c1362c1c536bbe40c8'
        const response = await axios.get(url)
        const fetchedNews = response.data.articles
        setHeadline(fetchedNews[0])
        console.log(fetchedNews[0])
      } catch (error) {
        console.error("Error fetching news:", error.message)
      }
    }
    fetchNews()
  }, [])

  return (
    <div className='news'>
      <header className="news-header">
        <h1 className='logo'>News & Blogs</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder='Search News...' />
            <button type='submit'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="user Image" />
            <p>Mary's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              <a href="#" className="nav-link">General</a>
              <a href="#" className="nav-link">World</a>
              <a href="#" className="nav-link">Business</a>
              <a href="#" className="nav-link">Technology</a>
              <a href="#" className="nav-link">Entertainment</a>
              <a href="#" className="nav-link">Sports</a>
              <a href="#" className="nav-link">Science</a>
              <a href="#" className="nav-link">Health</a>
              <a href="#" className="nav-link">Nation</a>
              <a href="#" className="nav-link">Bookmarks <i className="fa-regular fa-bookmark"></i></a>
            </div>
          </nav>
        </div>

        <div className="news-section">
          <div className="headline">
            {headline ? (
              <>
                <img src={headline.image} alt='Headline' />
                <h2 className="headline-title">
                  {headline.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h2>
              </>
            ) : (
              <p>Loading headline...</p>
            )}
          </div>

          <div className="news-grid">
            <div className="news-grid-item">
              <img src={techImg} alt="News Image" />
              <h3>Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark  bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={sportImg} alt="News Image" />
              <h3>Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark  bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={scienceImg} alt="News Image" />
              <h3>Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={worldImg} alt="News Image" />
              <h3>Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={healthImg} alt="News Image" />
              <h3>Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={nationImg} alt="News Image" />
              <h3>Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
          </div>
        </div>

        <div className="my-blogs">My Blogs</div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>

      <footer className="news-footer">Footer</footer>
    </div>
  )
}

// 1:50

export default News
