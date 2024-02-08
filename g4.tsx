import React, { useState, useEffect } from 'react';
import { IonContent, IonButton, IonPage, IonText } from '@ionic/react';

const GamePage: React.FC = () => {
  const history = useHistory();
  const colors = ["cat", "dog", "horse", "lion", "cow", "chicken"];
  const [correctColor, setCorrectColor] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [trialCount, setTrialCount] = useState<number>(0);

  useEffect(() => {
    displayNextColor();
  }, []);
  const startGame = () => {
    resetScore();
    displayNextColor();
  };

  const resetScore = () => {
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTrialCount(0);
  };

  const displayNextColor = () => {
    if (trialCount >= 10) {
      endGame();
      return;
    }

    setTrialCount(trialCount + 1);

    // Pick a random color from the array
    const nextCorrectColor = colors[Math.floor(Math.random() * colors.length)];
    setCorrectColor(nextCorrectColor);

    // Display the chosen color
    // You can implement your logic to display the color in your component

    // Play audio for the chosen color
    playAudio(nextCorrectColor);

    // Display four random options
    displayOptions();
  };
  

  const playAudio = (color: string) => {
    const audio = document.getElementById('audio') as HTMLAudioElement;
    audio.src = `${color}.wav`;
    audio.play();
    // Implement your audio logic here
  };
  const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const displayOptions = () => {
    const optionsContainer = document.getElementById('options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';

      // Shuffle the colors array and pick three random options
      const shuffledColors = shuffleArray(colors);
      const options = shuffledColors.slice(0, 4);

      // Ensure the correct color is among the options
      if (!options.includes(correctColor)) {
        const randomIndex = Math.floor(Math.random() * 4);
        options[randomIndex] = correctColor;
      }

    // Create image buttons for each option
    options.forEach(option => {
      const optionButton = document.createElement('img');
      optionButton.classList.add('option-btn');
      optionButton.src = `${option}.jpg`; // Assuming you have image files with names like 'red.png'
      optionButton.alt = option;
      optionButton.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(optionButton);
    });
    // Implement your displayOptions logic here
  };

  const checkAnswer = (selectedColor: string) => {
    if (selectedColor === correctColor) {
      setScore(score + 1);
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }

    displayNextColor();
    updateScoreDisplay();
  };

  const updateScoreDisplay = () => {
    const scoreElement = document.getElementById('score');
    const randwElement = document.getElementById('randw');
    if (scoreElement && randwElement) {
      scoreElement.textContent = `Score: ${score}`;
      randwElement.textContent = ` (Correct: ${correctCount}, Wrong: ${wrongCount})`;
    }
    // Implement your updateScoreDisplay logic here
  };

  const endGame = () => {
    localStorage.setItem('score', score.toString());
    // Redirect to 'score' page or perform other actions
    // For example: history.push('/score');
    history.push('/score');
    resetScore();
  };
  

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <audio id="audio"></audio>
        <audio id="background-audio" loop autoPlay>
          <source src="startsound.mp3" type="audio/mp3" />
        </audio>
        <div id="color-display" className="color-display-box">
          click <strong>'START'</strong> to begin the game!
        </div>
        <button id="start-btn" onClick={startGame}>
          START
        </button>

        <div id="options-container"></div>
        <div id="score">
          <strong>SCORE:</strong> {score}
        </div>
        <div id="randw"></div>
      </IonContent>
    </IonPage>
  );
};

