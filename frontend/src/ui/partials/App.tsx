import React from 'react';
import '../styles/App.css';

import { Outlet } from 'react-router-dom';
import Container from '../components/Container';
import ToastiNotification from '../components/screen/ToastiNotification';

function App() {
  return (
    <>
      <Container>
        <ToastiNotification/> 
        <Outlet/>
      </Container>      
    </>
  );
}

export default App;
