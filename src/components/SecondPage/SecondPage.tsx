import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertTitle, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
  },
  {
    field: 'body',
    headerName: 'Body',
    width: 400,
  },
];


const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = localStorage.getItem('userDetails');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchText, setSearchText] = useState('');
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

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredPosts = searchText
    ? posts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    )
    : posts;

  return (
    <Box>
      {showSuccess && (
        <Alert severity="success" onClose={() => navigate('/second')}>
          <AlertTitle>Success</AlertTitle>
          Form submitted successfully!
        </Alert>
      )}
      <h2>Welcome to the Users Page!</h2>
      <Box mb={2} display="flex" alignItems="center">
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box height={400} width="100%" minHeight="100%">
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
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

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};


export default SecondPage;
