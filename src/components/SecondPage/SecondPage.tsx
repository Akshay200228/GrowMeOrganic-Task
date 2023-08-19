import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = localStorage.getItem('userDetails');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const successParam = new URLSearchParams(location.search).get('success');

  useEffect(() => {
    if (!userDetails) {
      alert('Please provide your details before accessing this page');
      navigate('/');
      return;
    }

    async function fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();

    if (successParam) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate('/second');
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [navigate, userDetails, successParam]);

  return (
    <div>
      {showSuccess && (
        <Alert severity="success" onClose={() => navigate('/second')}>
          <AlertTitle>Success</AlertTitle>
          Form submitted successfully!
        </Alert>
      )}
      <h2>Second Page</h2>
      <p>Welcome to the second page!</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondPage;
