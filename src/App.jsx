import { useEffect } from 'react'
import './App.css'
import { router } from './router/index.jsx'

function App() {

  useEffect(() => {

    fetch("http://localhost:3000/user")
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

  }, []);

  return router();
}

export default App;
