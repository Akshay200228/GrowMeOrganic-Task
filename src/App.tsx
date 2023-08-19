import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import './App.css';
import FirstPage from './components/FirstPage/FirstPage';
import SecondPage from './components/SecondPage/SecondPage';

const lightTheme = createTheme({
  palette: {
    mode: 'light', // Default mode
    primary: {
      main: '#007bff', // Primary color
    },
    background: {
      default: '#f5f5f5', // Background color for light mode
    },
    text: {
      primary: '#333', // Text color for light mode
    },
    // Add more color overrides as needed
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007bff', // Primary color
    },
    background: {
      default: '#333', // Background color for dark mode
    },
    text: {
      primary: '#fff', // Text color for dark mode
    },
    // Add more color overrides as needed
  },
});

function App() {
  const handleSubmit = (name: string, phoneNumber: string, email: string) => {
    const userDetails = {
      name,
      phoneNumber,
      email,
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage onSubmit={handleSubmit} />} />
        <Route
          path="/second"
          element={
            localStorage.getItem('userDetails') ? <SecondPage /> : <Navigate to="/" state={{ from: '/second' }} />
          }
        />
      </Routes>
    </Router>
  );
}

export default function ThemedApp() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <App />
    </ThemeProvider>
  );
}
