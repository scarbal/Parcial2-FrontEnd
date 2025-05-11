import React from 'react';
import './SignUpForm.css';  // Importamos el archivo CSS

const SignUpForm: React.FC = () => {
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <button className="back-button">Back</button>

        <div>
          <h2 className="signup-title">Sign up for free</h2>
          <p className="signup-subtitle">Start managing your projects on Projectr</p>
        </div>

        <form className="signup-form">
          <div className="input-group">
            <label className="input-label">First name</label>
            <input
              type="text"
              placeholder="Jane"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Last name</label>
            <input
              type="text"
              placeholder="Doe"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              placeholder="janedoe"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="jane.doe@example.com"
              className="input-field"
            />
          </div>

          <div className="terms-group">
            <input type="checkbox" className="terms-checkbox" />
            <label className="terms-text">
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>

          <button
            type="submit"
            className="signup-button"
          >
            Sign up
          </button>
        </form>

        <p className="login-link">
          Already have an account?{' '}
          <a href="#" className="login-text">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
