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
          // Si el usuario está logueado, mostramos el botón de "New Project"
          <>
          <Link to= "/create-project">
          <button className="button-secondary">Create project</button>
          </Link>
          <Link to="/AboutUs">
            <button className="button-primary" id="aboutUs">About Us</button>
          </Link>
            <button className="button-tertiary" onClick={logout}>Log Out</button>
            <div className="avatar"></div>
            <ThemeToggleButton />
          </>
        )}
        
      </div>
    </header>
  );
};
