// eslint-disable-next-line no-unused-vars 
import React, { useState } from 'react';

function Navbar() {

  return (
    <nav style={{
        position: 'fixed',
        top: 0,
        zIndex: 1000, 
        left: 0,
        right: 0,
      backgroundColor: 'blue', // fond clair
      padding: '1rem 2rem',
      borderBottom: '2px solid #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',

    }}>
      <h1 style={{
        color: 'white', 
        fontSize: '2rem',
        margin: 0
      }}>
        Gestion-employés
      </h1>
    </nav>
  );
};

export default Navbar;
