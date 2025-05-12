import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Importamos el contexto
import './Header.css';  // Importamos el archivo CSS
import ThemeToggleButton from './ThemeToggleButton';


export const Header: React.FC = () => {
  const { user, login, logout } = useAuth();  // Accedemos al estado del usuario

  return (
    <header className="header">
      <div className="left-container">
        <span className="logo">◆ Acme Co.</span>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
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
          <button className="button-tertiary">Explore</button>
          <ThemeToggleButton />
          </>

          
        ) : (
          // Si el usuario está logueado, mostramos el botón de "New Project"
          <>
            <button className="button-secondary">New Project</button>
            <button className="button-tertiary" onClick={logout}>Log Out</button>
            <button className="button-tertiary">Explore</button>
            <div className="avatar"></div>
          </>
        )}
        
      </div>
    </header>
  );
};
