import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ProjectTable } from './components/ProjectTable';
import SignUpForm from './pages/SignUpForm';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './pages/LoginForm';
import CreateProject from './pages/CreateProject'; 
import PrivateRoute from './components/ProtectedRoutes'; 
import AboutUs from './pages/AboutUs'; 
import { useTheme } from './context/ThemeContext';
import React, { useEffect } from 'react';
import { ProjectDetail } from './pages/ProjectDetail';
import { Profile } from './pages/Profile';
import { EditProject } from './pages/EditProject';
import { EditProfile } from './pages/EditProfile';

const App: React.FC = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-3xl font-semibold mb-2">Explore public projects</h1>
                    <p className="text-gray-600 mb-6">
                      Find open-source projects, research papers, tech talks, and more
                    </p>
                    <ProjectTable />
                  </>
                }
              />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/project/:id" element={<ProjectDetail />} />

              
              {/* Ruta protegida */}
              <Route
                path="/create-project"
                element={
                  <PrivateRoute>
                    <CreateProject />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-project/:id"
                element={
                  <PrivateRoute>
                    <EditProject/>
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <PrivateRoute>
                    <EditProfile/>
                  </PrivateRoute>
                }
              />
              
              <Route path="/AboutUs" element={<AboutUs />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
