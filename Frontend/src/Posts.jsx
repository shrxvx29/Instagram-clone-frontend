import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

function Posts() {

    const [posts,setPosts] = useState([])

    useEffect(()=>{

        fetch('http://localhost:3000/posts')
        .then((data)=>data.json())
        .then(data=>setPosts(data))
        .catch(err=>console.log(err))
    },[]);



  return (
    <div>
        {posts.length > 0 ? (
            <div>
                {posts.map((post)=>(
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        ):(
           <div className="d-flex justify-content-center p-5">
             <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
             </div>
           </div> 
        )}
    </div>
  )
}

export default Posts