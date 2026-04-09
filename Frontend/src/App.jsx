import React from 'react'
import Sidebar from './Sidebar'
import SuggestionBar from './SuggestionBar'
import FeedPage from './FeedPage'

function App() {
  return (
    <div className=' d-flex  vh-100'>
    <div className='w-20'><Sidebar /></div>
    <div className='w-50'><FeedPage /></div>
    <div className='w-30 mx-4'><SuggestionBar /></div>
    </div>
   
  )
}

export default App