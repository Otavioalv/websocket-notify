import React, {useEffect} from 'react';

import { Outlet } from 'react-router-dom';
import Container from '../components/Container';
import ToastiNotification from '../components/screen/ToastiNotification';
import socket from '../../data/services/SocketIOService';
import { choseNotify } from '../../data/services/ToastService';

function App() {
  useEffect(() => {
    
    interface messageSocketIO {
      message: string,
      status: number
    }

    socket.on("allertError", async (data:messageSocketIO) => {
      await choseNotify([data.message], data.status);
    });
    
  }, []); 

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
