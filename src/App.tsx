import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import './App.css';
import FirstPage from './components/FirstPage/FirstPage';
import SecondPage from './components/SecondPage/SecondPage';

// Define light theme with specific color palette for light mode
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
});

// Define dark theme with specific color palette for dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007bff',
    },
    background: {
      default: '#333',
    },
    text: {
      primary: '#fff',
    },
  },
});

// Main App component
function App() {

  // Callback function to handle form submission
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

        {/* Route for the first page with form */}
        <Route path="/" element={<FirstPage onSubmit={handleSubmit} />} />

        {/* Route for the second page (requires user details) */}
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

// ThemedApp component to apply theme based on user's color scheme preference
export default function ThemedApp() {

  // Determine user's color scheme preference (light or dark)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    // Apply the selected theme (light or dark) using ThemeProvider
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <App />
    </ThemeProvider>
  );
}
