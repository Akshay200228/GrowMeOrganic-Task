import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const userDetails = localStorage.getItem('userDetails');

  useEffect(() => {
    if (!userDetails) {
      alert('Please provide your details before accessing this page');
      navigate('/');
    }
  }, [navigate, userDetails]);

  return (
    <div>
      <h2>Second Page</h2>
      <p>Welcome to the second page!</p>
    </div>
  );
};

export default SecondPage;
