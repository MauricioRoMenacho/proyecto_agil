import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {

    fetch("http://localhost:3000/user")
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

  }, []);

  return (
    <h1>React conectado con Node.js</h1>
  )
}

export default App;
