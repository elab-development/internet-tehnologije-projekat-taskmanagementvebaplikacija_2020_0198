// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/forgotpassword', {
        email,
      });

      setMessage(response.data.message);
    } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message);
        }
        throw new Error("Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Forgot password</h2>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleForgotPassword}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending reset link...' : 'Send reset link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
