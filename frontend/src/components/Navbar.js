// /frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
      <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
      <Link to="/rider" style={{ marginRight: 10 }}>Rider Dashboard</Link>
      <Link to="/driver" style={{ marginRight: 10 }}>Driver Dashboard</Link>
    </nav>
  );
}

export default Navbar;
