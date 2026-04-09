import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setStory(null);
    setProgress(0);
    fetch(`https://instagram-clone-frontend-o32g.onrender.com/stories/${id}`)
      .then(res => res.json())
      .then(data => {
        setStory(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    if (Number(id) > Number(tot) || Number(id) <= 0) {
      navigate('/');
    }
  }, [id, tot, navigate]);

  // Story progress timer (1% every 50ms = 5000ms total)
  useEffect(() => {
    if (!story) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleNext();
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [id, story, tot]);

  const handleNext = () => {
    const nextId = Number(id) + 1;
    if (nextId > Number(tot)) {
      navigate('/');
    } else {
      navigate(`/story/${nextId}/${tot}`);
    }
  };

  const handlePrev = () => {
    const prevId = Number(id) - 1;
    if (prevId <= 0) {
      navigate('/');
    } else {
      navigate(`/story/${prevId}/${tot}`);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  if (!story) {
    return (
      <div className="viewer flex-column">
        <div className="spinner-border text-light mb-3"></div>
      </div>
    );
  }

  return (
    <div className="viewer">
      {/* Progress Bar */}
      <div className="progress-bar" style={{ zIndex: 10 }}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Header */}
      <div 
        className="viewer-header w-100 px-3 d-flex justify-content-between align-items-center" 
        style={{ boxSizing: 'border-box', zIndex: 10 }}
      >
        <div className="d-flex align-items-center gap-2">
          <img src={story.user.profile_pic} alt="profile" style={{ objectFit: 'cover' }} />
          <span className="fw-bold fs-6">{story.user.username}</span>
          <span className="text-white-50 ms-2" style={{ fontSize: '13px' }}>12h</span>
        </div>
        <i className="bi bi-x" onClick={handleClose} style={{ cursor: 'pointer', fontSize: '32px' }}></i>
      </div>

      {/* Invisible Click Zones for Navigation */}
      <div className="left" onClick={handlePrev} style={{ zIndex: 5 }}></div>
      <div className="right" onClick={handleNext} style={{ zIndex: 5 }}></div>

      {/* Main Story Image */}
      <img className="viewer-img" src={story.storyImage} alt="Story" />
    </div>
  );
}

export default ViewStory;