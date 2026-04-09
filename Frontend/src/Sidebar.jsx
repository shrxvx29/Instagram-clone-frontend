import React from 'react'
import logoText from './assets/Insta-Text.png'

function Sidebar() {
  return (
    <div className='d-flex flex-column  m-2 position-fixed w-20 ' >

      <img className='logo-text' src={logoText} alt="Instagram Logo" />

      <div className='d-flex flex-column mx-4 gap-1'>
        <p className=''><i className="bi bi-house"></i>Home</p>
        <p><i className="bi bi-file-play"></i>Reels</p>
        <p><i className="bi bi-send"></i>Message</p>
        <p><i className="bi bi-search"></i>Search</p>
        <p><i className="bi bi-compass"></i>Explore</p>
        <p><i className="bi bi-heart"></i>Notification</p>
        <p><i className="bi bi-plus-circle-dotted"></i>Create</p>
        <p><i className="bi bi-person-circle"></i>Profile</p>
      </div>
      <div className='position-fixed bottom-0 my-2 mx-4 '>
        <p><i className="bi bi-list"></i>More</p>
        <p><i className="bi bi-grid"></i>Also From Meta</p>
      </div>
    </div>
  )
}

export default Sidebar