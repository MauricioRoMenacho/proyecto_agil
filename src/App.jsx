import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './router/index.jsx'; // Importamos el componente de rutas

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;