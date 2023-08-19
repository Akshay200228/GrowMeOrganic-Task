import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container } from '@mui/material';

interface FirstPageProps {
  onSubmit: (name: string, phoneNumber: string, email: string) => void;
}

const FirstPage: React.FC<FirstPageProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '' || phoneNumber.trim() === '' || email.trim() === '') {
      alert('Please fill in all the details.');
    } else if (!isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number (10 digits).');
    } else if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
    } else {
      onSubmit(name, phoneNumber, email);
      navigate('/second');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    // Basic phone number validation: Exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email: string) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2">First Page</Typography>
      <form>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          onKeyPress={handleKeyPress} // Handle "Enter" key press
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          type="tel"
          inputProps={{ pattern: '[0-9]{10}' }}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          onKeyPress={handleKeyPress} // Handle "Enter" key press
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          onKeyPress={handleKeyPress} // Handle "Enter" key press
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FirstPage;
