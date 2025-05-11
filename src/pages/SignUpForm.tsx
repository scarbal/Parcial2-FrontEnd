import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  collection, addDoc, query, where, getDocs
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import './SignUpForm.css';

const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones locales
    if (firstName.length < 3) return setError('First name must be at least 3 characters.');
    if (lastName.length < 3) return setError('Last name must be at least 3 characters.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (!validateEmail(email)) return setError('Invalid email address.');
    if (!username) return setError('Username is required.');

    try {
      // Verificar si el username ya existe
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return setError('Username is already taken.');
      }

      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos en Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName,
        lastName,
        username,
        email,
      });

      console.log("Usuario registrado correctamente");
      navigate('/login');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-title">Sign up for free</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>First name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Last name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="signup-button">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
