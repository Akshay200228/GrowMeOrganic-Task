import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FirstPageProps {
  onSubmit: (name: string, phoneNumber: string, email: string) => void;
}

const FirstPage: React.FC<FirstPageProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (name && phoneNumber && email) {
      onSubmit(name, phoneNumber, email);
      navigate('/second');
    } else {
      alert('Please enter all details');
    }
  };

  return (
    <div>
      <h2>First Page</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FirstPage;
