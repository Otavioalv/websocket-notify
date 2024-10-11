import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/App.css';
import Container from '../components/Container';

function App() {
  return (
    <>
      <Container>
        <Outlet/> 
      </Container>      
    </>
  );
}

export default App;
