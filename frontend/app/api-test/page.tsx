"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    axios
      .get('http://localhost:8000/')
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error('API Error:', err));
  }, []);
  
  return (
    <main>
      <h1>FastAPI says:</h1>
      <p>{message}</p>
    </main>
  );
}
