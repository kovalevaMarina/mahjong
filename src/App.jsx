import "./styles/main.scss";
import { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);
  const btn = [
    37, 41, 31, 11, 29, 53, 5, 3, 11, 43, 5, 3, 23, 29, 17, 47, 7, 17, 41, 19,
    47, 19, 23, 59, 7, 37, 13, 43, 53, 59, 13, 31,
  ];

  useEffect(() => {
    const result = [];
    for (let i = 0; i < 16; i++) {
      addPrimeNumberToArray(result);
    }
    const shuffledResult = shuffleArray(result);
    setNumbers(shuffledResult);
  }, []);

  const addPrimeNumberToArray = (array) => {
    const randomNumber = getRandomNumber();
    if (isPrime(randomNumber) && !hasPairNumberInArray(array, randomNumber)) {
      array.push(randomNumber, randomNumber);
    } else {
      addPrimeNumberToArray(array);
    }
  };

  const hasPairNumberInArray = (array, number) => {
    const filteredArray = array.filter((item) => {
      return item === number ? true : false;
    });

    return filteredArray.length === 2;
  };

  const getRandomNumber = (min = 2, max = 60) => {
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    return random;
  };

  const isPrime = (number) => {
    let resultPrime;
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        resultPrime = false;
        break;
      } else {
        resultPrime = true;
      }
    }
    return resultPrime;
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title-h1">Mahjong</h1>
        <div className="btn-list">
          {numbers.map((number, i) => {
            return (
              <button key={i} className="btn-list__item">
                {number}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
