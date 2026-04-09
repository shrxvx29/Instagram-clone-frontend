import React from 'react'
import StoryBar from './StoryBar'
import Posts from './Posts'

function FeedPage() {
  return (
    <>
    <div className='story '><StoryBar /></div>
    <div><Posts /></div>
    </>
    
  )
}

export default FeedPage