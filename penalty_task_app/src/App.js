import './App.css';
import React, { useState, useEffect } from 'react';
import wheelImage from './assets/spin_wheel.png';

function App() {
  const [spinning, setSpinning] = useState(false);
  const [inputText, setInputText] = useState('');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button is disabled initially
  const [lastSpunName, setLastSpunName] = useState('');

  const heavy_devices = ['Big oven', 'Fridge', 'Shoerack'];
  const small_devices = ['Small oven', 'Dryer', 'Washing machine'];

  const deviceToAngle = {
    'Shoerack': 0,
    'Big oven': 240,
    'Fridge': 300,
    'Small oven': 60,
    'Dryer': 180,
    'Washing machine': 120
  };

  const handlePenalty = (name, number) => {
    let isHeavy = false;

    switch (name) {
      case 'kiru':
        isHeavy = (number % 3 === 0 || number % 2 === 0) && number !== 7;
        break;
      case 'bharath':
        isHeavy = (number % 1 === 0) && number !== 7;
        break;
      case 'vishnu':
        isHeavy = (number % 4 === 0) && number !== 7;
        break;
      case 'abishek':
        isHeavy = (number % 2 === 0) && number !== 7;
        break;
      case 'joel':
        isHeavy = (number % 3 === 0) && number !== 7;
        break;
      case 'kausik':
        isHeavy = (number % 6 === 0) && number !== 7;
        break;
      default:
        return null;
    }

    const deviceList = isHeavy ? heavy_devices : small_devices;
    const chosen = deviceList[Math.floor(Math.random() * deviceList.length)];

    // Return chosen device and name for alert
    return { chosen, name };
  };

  const handleSpin = () => {
    const name = inputText.toLowerCase();
    const matchedName = getMatchedName(name);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
  
    if (!matchedName) {
      alert('SARIYANA PEYAR VENDUM');
      return;
    }
  
    if (randomNumber === 7) {
      alert('You are forgiven!');
      setLastSpunName(matchedName); // Still record the last used name
      setIsButtonDisabled(true); // Disable button until name changes
      return;
    }
  
    const result = handlePenalty(matchedName, randomNumber);
    if (!result) return;
  
    const { chosen, name: finalName } = result;
  
    setRotationAngle(prev => prev + 1080 + deviceToAngle[chosen]);
    setSpinning(true);
    setIsButtonDisabled(true);
    setLastSpunName(name); // Save the last used name
  
    setTimeout(() => {
      alert(`${finalName.toUpperCase()} penalty: ${chosen}`);
      setRotationAngle(prev => prev - deviceToAngle[chosen]);
      setSpinning(false);
    }, 3000);
  };  

  const getMatchedName = (text) => {
    if (text.includes('kiru')) return 'kiru';
    if (text.includes('bharath')) return 'bharath';
    if (text.includes('vishnu')) return 'vishnu';
    if (text.includes('abishek')) return 'abishek';
    if (text.includes('joel')) return 'joel';
    if (text.includes('kausik')) return 'kausik';
    return '';
  };

  // Effect to check if inputText has changed to enable/disable the button
  useEffect(() => {
    const name = inputText.toLowerCase().trim();
    const matchedName = getMatchedName(name);
    if (matchedName && matchedName !== lastSpunName) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [inputText, lastSpunName]);

  const handleInputChange = (e) => {
    setInputText(e.target.value); // Update input text
  };

  return (
    <div className="App">
      <header className='header'>
        KUTTRAVAALIGAL GARUDA PURANATHIN PADI THANDIKA PADUVARGAL
      </header>
      <div>
        <input
          type="text"
          placeholder="Kutravaaliyin peyar"
          value={inputText}
          onChange={handleInputChange} // Use the custom input change handler
          className="input-box"
        />
        <button onClick={handleSpin} disabled={isButtonDisabled}>Urutu</button> {/* Disable button during spinning */}
        <div className="wheel-container">
          <img
            src={wheelImage}
            alt="Spin Wheel"
            className={`wheel`}
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
        </div>
        <span className="unicode-arrow">↑</span>
      </div>
    </div>
  );
}

export default App;

