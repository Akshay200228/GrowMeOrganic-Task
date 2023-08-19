import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Alert, AlertTitle, Snackbar, useTheme } from '@mui/material';

interface FirstPageProps {
  onSubmit: (name: string, phoneNumber: string, email: string) => void;
}

const FirstPage: React.FC<FirstPageProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });
  const [inputErrors, setInputErrors] = useState({
    name: false,
    phoneNumber: false,
    email: false,
  });

  // Load user details from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('userDetails');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, phoneNumber, email } = formData;
    const newInputErrors = {
      name: name.trim() === '',
      phoneNumber: !isValidPhoneNumber(phoneNumber),
      email: !isValidEmail(email),
    };

    setInputErrors(newInputErrors);

    if (!Object.values(newInputErrors).some((error) => error)) {
      // Save user details to local storage
      localStorage.setItem('userDetails', JSON.stringify(formData));
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
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4,
        padding: 3,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'white' : 'divider',
        borderRadius: 'borderRadius',
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        color: theme.palette.mode === 'dark' ? 'white' : '#333', // Text color
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Fill User Details
      </Typography>
      <form>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          sx={{
            marginBottom: 2,
            '& label': {
              color: theme.palette.mode === 'dark' ? 'white' : 'initial',
            },
            '& input': {
              color: theme.palette.mode === 'dark' ? 'white' : 'initial',
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'initial',
            },
          }}
          onKeyPress={handleKeyPress}
          error={inputErrors.name}
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          type="tel"
          inputProps={{ pattern: '[0-9]{10}' }}
          value={formData.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          sx={{
            marginBottom: 2,
            '& label': {
              color: theme.palette.mode === 'dark' ? 'white' : 'initial',
            },
            '& input': {
              color: theme.palette.mode === 'dark' ? 'white' : 'initial',
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'initial',
            },
          }}
          onKeyPress={handleKeyPress}
          error={inputErrors.phoneNumber}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          sx={{
            marginBottom: 2,
            '& label': {
              color: theme.palette.mode === 'dark' ? 'white' : 'initial',
            },
            '& input': {
              color: theme.palette.mode === 'dark' ? 'white' : 'initial',
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'initial',
            },
          }}
          onKeyPress={handleKeyPress}
          error={inputErrors.email}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            backgroundColor: '#007bff',
            color: theme.palette.mode === 'dark' ? 'white' : 'initial',
          }}
        >
          Submit
        </Button>

        <Snackbar
          open={inputErrors.name || inputErrors.phoneNumber || inputErrors.email}
          autoHideDuration={3000}
          onClose={() => setInputErrors({ name: false, phoneNumber: false, email: false })}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {inputErrors.name && 'Please fill in the name field.'}
            {inputErrors.phoneNumber && 'Please enter a valid phone number (10 digits).'}
            {inputErrors.email && 'Please enter a valid email address.'}
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
};

export default FirstPage;
