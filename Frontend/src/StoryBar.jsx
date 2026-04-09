import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function StoryBar() {
  const [stories, setStories] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/stories')
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  if (stories.length === 0) {
    return <p className="text-center mt-3">Loading stories...</p>;
  }

  return (
    <div className="story-container">
      {stories.map((story) => (
        <div
          key={story.id}
          className="story-item"
          onClick={()=>{navigate(`/story/${story.id}/${stories.length}`)}}
        >

          {/* Gradient ring */}
          <div className="story-ring">
            <img
              src={story.user.profile_pic}
              alt="story"
              className="story-img"
            />
          </div>

          {/* Username */}
          <p className="story-username">
            {story.user.username}
          </p>

        </div>
      ))}

    </div>
  );
}

export default StoryBar;