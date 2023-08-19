import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertTitle, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'body', headerName: 'Body', width: 400 },
];

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
    <Box>
      {showSuccess && (
        <Alert severity="success" onClose={() => navigate('/second')}>
          <AlertTitle>Success</AlertTitle>
          Form submitted successfully!
        </Alert>
      )}
      <h2>Second Page</h2>
      <p>Welcome to the second page!</p>
      <Box height={400} width="100%" minHeight="100%">
        <DataGrid
          rows={posts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default SecondPage;
