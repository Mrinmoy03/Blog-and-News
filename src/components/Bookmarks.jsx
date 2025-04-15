import React from 'react'
import "../styles/modal.css";
import "../styles/Bookmarks.css";
import demoImg from "../assets/images/demo.jpg";
const Bookmarks = () => {
  return (
    <div className='modal-overlay'>
       <div className="modal-content">
        <span className='close-button'>
        <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className='bookmarks-heading'>Bookmarked News</h2>
        <div className="bookmarks-list">
           <div className="bookmark-item">
            <img src={demoImg} alt="" />
            <h3>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit est, architecto animi.
            </h3>
            <span className='delete-button'>
                <i className="fa-regular fa-circle-xmark"></i>
            </span>
            </div> 

        </div>
       </div>
    </div>
  )
}

export default Bookmarks