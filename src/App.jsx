import "./styles/main.scss";
import { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const result = [];
    for (let i = 0; i < 16; i++) {
      addPrimeNumberToArray(result);
    }
    const shuffledResult = shuffleArray(result);
    setNumbers(shuffledResult);

    setTimeout(() => {
      numbers.forEach((item) => (item.visible = false));
    }, 5000);
  }, []);

  const addPrimeNumberToArray = (array) => {
    const randomNumber = getRandomNumber();
    if (isPrime(randomNumber) && !hasPairNumberInArray(array, randomNumber)) {
      const element = {
        number: randomNumber,
        visible: true,
      };
      array.push(element, element);
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

  const handleClick = (element) => {
    element.visible = false;
    console.log(element);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title-h1">Mahjong</h1>
        <div className="btn-list">
          {numbers.map((element, i) => {
            return (
              <button
                key={i}
                className="btn-list__item"
                onClick={() => handleClick(element)}
              >
                {element.visible ? element.number : ""}
                {String(element.visible)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
