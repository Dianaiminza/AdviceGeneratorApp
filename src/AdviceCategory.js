import React, { useState, useEffect } from 'react';

const AdviceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedAdvice, setSelectedAdvice] = useState(null);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Log the data to inspect the structure
        setCategories(data.slips || []); // Assuming slips is an array
      })
      .catch(error => console.error('Error fetching advice:', error));
  }, []);

  const handleButtonClick = () => {
    const randomAdviceObj = categories[Math.floor(Math.random() * categories.length)];
    setSelectedAdvice(randomAdviceObj ? randomAdviceObj.advice : 'Advice not found');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        Get Random Advice
      </button>

      {selectedAdvice !== null && (
        <div>
          <p>Selected Advice:</p>
          <p>{selectedAdvice}</p>
        </div>
      )}
    </div>
  );
};

export default AdviceCategories;


