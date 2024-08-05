// pages/cards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cards = () => {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
    setExpandedCards({}); // Reset expanded state when filter changes
    console.log('Selected Post ID:', event.target.value);
  };

  const handleCardClick = (postId) => {
    setExpandedCards(prevState => {
      const newState = { ...prevState, [postId]: !prevState[postId] };
      console.log('Expanded Cards State:', newState);
      return newState;
    });
  };

  const getFilteredPosts = () => {
    const filteredPosts = selectedId
      ? posts.filter(post => post.id === parseInt(selectedId, 10))
      : posts;
    console.log('Filtered Posts:', filteredPosts);
    return filteredPosts;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-center">
        <label htmlFor="postSelect" className="mr-2 text-lg font-semibold">Select Post ID:</label>
        <select id="postSelect" onChange={handleSelectChange} className="p-2 border rounded">
          <option value="">All</option>
          {posts.map(post => (
            <option key={post.id} value={post.id}>{post.id}</option>
          ))}
        </select>
      </div>


      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredPosts().map(post => (
          <div
            key={post.id}
            className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer"
            onClick={() => handleCardClick(post.id)}
          >
            <h2 className="font-bold text-xl mb-2">Post ID: {post.id}</h2>
            {expandedCards[post.id] && (
              <>
                <h3 className="font-semibold text-lg mb-1">User ID: {post.userId}</h3>
                <h3 className="font-semibold text-lg mb-1">Title: {post.title}</h3>
                <p className="text-gray-700">{post.body}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
