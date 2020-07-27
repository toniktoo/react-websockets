import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Canvas = styled.canvas`
  background: linear-gradient(#bbb, transparent 1px),
    linear-gradient(90deg, #bbb, transparent 1px);
  background-size: 15px 15px;
  background-position: center center;
  overflow: hidden;
`;

const CanvasList = ({ width, height, socket }) => {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  const { colorMouse, sizeMouse } = useSelector((state) => state.pointReducer);

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  useEffect(() => {
    socket.on('coordinatesGet', (data) => {
      if (data) {
        const { mousePosition, newMousePosition } = data;
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    });
    return () => socket.on('coordinatesGet');
  }, []);

  const paint = useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);

          const data = {
            mousePosition,
            newMousePosition,
          };
          socket.emit('coordinatesSend', data);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (originalMousePosition, newMousePosition) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = colorMouse;
      context.lineJoin = 'round';
      context.lineWidth = sizeMouse;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  return <Canvas ref={canvasRef} />;
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default CanvasList;
