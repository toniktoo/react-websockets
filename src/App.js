import React, { useEffect } from 'react';
import styled from 'styled-components';
import socketIOClient from 'socket.io-client';

import CanvasList from './components/CanvasList';
import LayerSettings from './components/canvas-setting/LayerSettings';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const App = () => {
  const ENDPOINT = 'http://127.0.0.1:3001';
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
    });
    return () => socket.disconnect();
  }, []);

  return (
    <Wrapper>
      <CanvasList socket={socket} />
      <LayerSettings socket={socket} />
    </Wrapper>
  );
};

export default App;
