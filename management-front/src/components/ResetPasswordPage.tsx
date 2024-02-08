import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/resetpassword', {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage(response.data.message);
      navigate('/login')
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
      <h2>Reset Password</h2>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleResetPassword}>
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

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmation"
            placeholder="Confirm your new password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
