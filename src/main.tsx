// main.tsx
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de importar los estilos globales
import App from './App';
import { ThemeProvider } from './context/ThemeContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

