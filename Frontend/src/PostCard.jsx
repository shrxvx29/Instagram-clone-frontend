import React, { useState } from 'react';

function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLike = () => {
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    
    // Optimistic UI update
    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    // Update json-server backend
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likesCount: newLikesCount })
    }).catch(err => console.log('Error updating like:', err));
  };

  return (
    <div className='postscard mx-5 py-2 mb-5 px-2'>
        <div className='d-flex justify-content-between '>
            <div className='d-flex  px-4'>
                <img className='rounded-circle dp' src={post.user.profile_pic} alt="" />
                <h5 className='py-3 px-3'>{post.user.username}</h5>
            </div>
            <div>
                <h5 
                  className={`py-2 mx-3 ${isFollowing ? 'text-secondary' : 'text-primary'}`} 
                  style={{ cursor: 'pointer', transition: 'color 0.2s ease' }}
                  onClick={handleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </h5>
            </div>
        </div>
        
        <div>
            {/* Added onDoubleClick to images so users can also double tap to like! */}
            <img 
              className='post' 
              src={post.image} 
              alt="" 
              onDoubleClick={!isLiked ? handleLike : undefined} 
              style={{ cursor: 'pointer' }}
            />
            <h6 className='pt-3 mx-3'>{post.caption}</h6>
        </div>
        <div className='px-3 pt-1 pb-2 d-flex gap-3 align-items-center'>
            <i 
              className={`bi ${isLiked ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart'}`}
              style={{ cursor: 'pointer', fontSize: '24px', transition: 'transform 0.1s ease' }}
              onClick={handleLike}
            ></i>
            <i className="bi bi-chat" style={{ cursor: 'pointer', fontSize: '24px' }}></i>
            <i className="bi bi-send" style={{ cursor: 'pointer', fontSize: '24px' }}></i>
        </div>
        <div>
            <h6 className='mx-3'>{likesCount} Likes</h6>
        </div>
    </div>
  );
}

export default PostCard;
