import React, { useState } from 'react';
import './LoginForm.css';
import { auth, provider } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      return setError('Invalid email format.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in with email!");
      navigate('/');
    } catch (error: any) {
      console.error('Error logging in: ', error.message);
      setError('Incorrect email or password.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("Logged in with Google!");
      navigate('/');
    } catch (error: any) {
      console.error('Error logging in with Google: ', error.message);
      setError('Google login failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Log in</h1>

        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">Forgot your password?</div>

          <button type="submit" className="login-button">Log in</button>
        </form>

        <div className="google-login-container">
          <button className="google-login-button" onClick={handleGoogleLogin}>
            Log in with Google
          </button>
          <button className="SignUp-link" onClick={() => navigate('/signup')}>
            You don't have an account
          </button>
        </div>
        <p className="terms-text">
          By clicking Log in, you agree to our Terms of Service, Privacy Policy, and Cookie Policy
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
