import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [activeAdviceIndex, setActiveAdviceIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setActiveAdviceIndex(prevIndex => (prevIndex + 1) % adviceList.length);
      }
    }, 5000); // Change the interval time as needed (e.g., 5000 milliseconds or 5 seconds)

    return () => clearInterval(intervalId);
  }, [isPaused, adviceList]);

  const fetchAdvice = () => {
    fetch('https://api.adviceslip.com/advice?slip=1')
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Log the data to inspect the structure
        setAdviceList(prevAdviceList => [...prevAdviceList, data.slip.advice]);
      })
      .catch(error => console.error('Error fetching advice:', error));
  };

  const handleNextAdvice = () => {
    fetchAdvice();
    setActiveAdviceIndex(prevIndex => (prevIndex + 1) % adviceList.length);
  };

  const handlePauseToggle = () => {
    setPaused(prevPaused => !prevPaused);
  };

  return (
    <div className="App">
      <h1>Advice Generator App</h1>
      <div className="rectangle-container">
        {adviceList.length > 0 && (
          <>
            <p className="advice-number">Advice #{activeAdviceIndex + 1}</p>
            <p className="active-advice">{adviceList[activeAdviceIndex]}</p>
          </>
        )}
      </div>
      <div className="button-container">
        <button className="button" onClick={handleNextAdvice}>
          Next
        </button>
        <button className="button" onClick={handlePauseToggle}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default App;
