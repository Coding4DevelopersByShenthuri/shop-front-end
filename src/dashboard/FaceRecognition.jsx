import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
  const videoRef = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    // Load face-api.js models
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    setIsModelLoaded(true);
    startVideo();
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error starting video stream:', err));
  };

  const handleVideoPlay = async () => {
    const interval = setInterval(async () => {
      if (isModelLoaded) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );
        setFaceDetected(detections.length > 0);
        if (detections.length > 0) {
          // Send detected face data to the backend for verification
          // (e.g., using fetch or axios to post the data)
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  };

  return (
    <div>
      <h2>Face Recognition</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        onPlay={handleVideoPlay}
      />
      {faceDetected ? (
        <p>Face detected! Verifying...</p>
      ) : (
        <p>No face detected</p>
      )}
    </div>
  );
};

export default FaceRecognition;
