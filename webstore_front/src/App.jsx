import { useState } from 'react'
import "./App.css";
import { BrowserRouter } from 'react-router-dom'
import BasicRoute from './routes/BasicRoute'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [count, setCount] = useState(0)

  return (
          <BrowserRouter>
              <BasicRoute />
          </BrowserRouter>
  )
}

export default App
