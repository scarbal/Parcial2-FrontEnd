import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import './Header.css';  
import ThemeToggleButton from './ThemeToggleButton';
import { seedProjects } from '../scripts/seedProjects'; 

export const Header: React.FC = () => {
  const { user, login, logout } = useAuth();  

  const handleSeed = async () => {
    try {
      await seedProjects();
      alert('✅ Base de datos sembrada correctamente!');
    } catch (error) {
      console.error('Error al sembrar datos:', error);
      alert('❌ Error al sembrar datos');
    }
  };

  return (
    <header className="header">
      <div className="left-container">
        <Link to="/">
          <span className="logo">◆ My Open Lab</span>
        </Link>
      </div>
      <div className="right-container">
        {!user ? (
          <>
            <Link to="/AboutUs">
              <button className="button-primary" id="aboutUs">About Us</button>
            </Link>
            <Link to="/login">
              <button className="button-primary">Log In</button>
            </Link>
            <ThemeToggleButton />
          </>
        ) : (
          <>
            <Link to="/create-project">
              <button className="button-secondary">Create project</button>
            </Link>
            <Link to="/AboutUs">
              <button className="button-primary" id="aboutUs">About Us</button>
            </Link>
             {/* Botón de seed: <button className="button-secondary" onClick={handleSeed}>Seed Database</button> */}
            <button className="button-tertiary" onClick={logout}>Log Out</button>
            <div className="avatar"></div>
            <ThemeToggleButton />
          </>
        )}
      </div>
    </header>
  );
};
