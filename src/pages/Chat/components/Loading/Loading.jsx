import React, { useEffect } from 'react';
import './Loading.css';

const LoadingPage = () => {
  useEffect(() => {
    // Create the torch cursor div
    const torchCursor = document.createElement('div');
    torchCursor.classList.add('torch-cursor');
    document.body.appendChild(torchCursor);

    // Update cursor position on mouse move
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      torchCursor.style.left = `${x}px`;
      torchCursor.style.top = `${y}px`;
    };

    // Add event listener for mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(torchCursor);
    };
  }, []);

  return (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;

