import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Create from './pages/Create.jsx';
import Home from './pages/Home.jsx';
import PrivateRoute from './pages/privateRoute.jsx';
import Dashboard from './components/layout/Dashboard.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} >
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App