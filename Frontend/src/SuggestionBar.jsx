import React, { useEffect, useState } from 'react'

function SuggestionBar() {

    const [profile, setProfile] = useState(null)
    const [suggestions, setSuggestions] = useState([])
    const [followedIds, setFollowedIds] = useState(new Set())

    const handleFollow = (id) => {
        setFollowedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    useEffect(() => {

        fetch('https://instagram-clone-frontend-o32g.onrender.com/profile')
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.log(err))

        fetch('https://instagram-clone-frontend-o32g.onrender.com/stories')
            .then(res => res.json())
            .then(data => setSuggestions(data))
            .catch(err => console.log(err))

    }, [])

    return (
        <div className="p-3 position-fixed" style={{ width: "300px" }}>

            {/* Profile Section */}
            {profile ? (
                <div className="d-flex justify-content-between align-items-center mb-4">
                    
                    <div className="d-flex align-items-center">
                        <img
                            src={profile.profile_pic}
                            alt="profile"
                            className="rounded-circle me-3"
                            width="45"
                            height="45"
                        />
                        <div>
                            <div style={{ fontSize: "14px", fontWeight: "600" }}>
                                {profile.name}
                            </div>
                            <div style={{ fontSize: "12px", color: "#888" }}>
                                Welcome back
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-sm text-danger fw-bold">
                        Logout
                    </button>

                </div>
            ) : (
                <p>Loading...</p>
            )}

            {/* Suggestions Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={{ fontSize: "13px", color: "#888", fontWeight: "600" }}>
                    Suggested for you
                </span>
                <span style={{ fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    See All
                </span>
            </div>

            {/* Suggestions List */}
            {suggestions.length > 0 ? (
                suggestions.map((user) => {
                    const isFollowing = followedIds.has(user.id);
                    return (
                        <div
                            key={user.id}
                            className="d-flex justify-content-between align-items-center mb-4"
                        >
                            <div className="d-flex align-items-center">
                                <img
                                    src={user.profile_pic}
                                    alt="user"
                                    className="rounded-circle me-3"
                                    width="40"
                                    height="40"
                                />
                                <div>
                                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                                        {user.username}
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#888" }}>
                                        Suggested for you
                                    </div>
                                </div>
                            </div>

                            <button 
                                className={`btn btn-sm fw-bold ${isFollowing ? 'text-secondary' : 'text-primary'}`}
                                onClick={() => handleFollow(user.id)}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    );
                })
            ) : (
                <p>No suggestions</p>
            )}

        </div>
    )
}

export default SuggestionBar