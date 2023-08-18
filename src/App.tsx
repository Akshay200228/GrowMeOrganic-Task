import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import FirstPage from './components/FirstPage/FirstPage';
import SecondPage from './components/SecondPage/SecondPage';

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

export default App;
