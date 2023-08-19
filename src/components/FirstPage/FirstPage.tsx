import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Alert, AlertTitle, Snackbar } from '@mui/material';

interface FirstPageProps {
  onSubmit: (name: string, phoneNumber: string, email: string) => void;
}

const FirstPage: React.FC<FirstPageProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });
  const [showError, setShowError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, phoneNumber, email } = formData;
    let hasError = false;

    if (name.trim() === '' || phoneNumber.trim() === '' || email.trim() === '') {
      setShowError(true);
      hasError = true;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setShowPhoneError(true);
      hasError = true;
    } else if (!isValidEmail(email)) {
      setShowEmailError(true);
      hasError = true;
    }

    if (!hasError) {
      onSubmit(name, phoneNumber, email);
      navigate('/second?success=true'); // Pass the success parameter
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="first-page-container">
      <div className="bg-image"></div>
      <Container maxWidth="sm">
        <Typography variant="h2">First Page</Typography>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            margin="normal"
            onKeyPress={handleKeyPress}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="tel"
            inputProps={{ pattern: '[0-9]{10}' }}
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            margin="normal"
            onKeyPress={handleKeyPress}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            margin="normal"
            onKeyPress={handleKeyPress}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Snackbar
            open={showError || showPhoneError || showEmailError}
            autoHideDuration={3000}
            onClose={() => {
              setShowError(false);
              setShowPhoneError(false);
              setShowEmailError(false);
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {showError && 'Please fill in all the details.'}
              {showPhoneError && 'Please enter a valid phone number (10 digits).'}
              {showEmailError && 'Please enter a valid email address.'}
            </Alert>
          </Snackbar>
        </form>
      </Container>
    </div>
  );
};

export default FirstPage;
