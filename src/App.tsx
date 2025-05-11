import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ProjectTable } from './components/ProjectTable';
import SignUpForm from './pages/SignUpForm'; 
import './App.css';  // Importamos el archivo de estilos CSS
import { AuthProvider } from './context/AuthContext';
import LoginForm from './pages/LoginForm';

const App: React.FC = () => {
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
              <Route path='/login' element={<LoginForm/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

