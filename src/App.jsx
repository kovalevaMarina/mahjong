import "./styles/main.scss";
import { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [firstNumberInPair, setFirstNumberInPair] = useState({});

  useEffect(() => {
    const result = [];
    for (let i = 0; i < 16; i++) {
      addPrimeNumberToArray(result);
    }
    const shuffledResult = shuffleArray(result);
    setNumbers(shuffledResult);

    setTimeout(() => {
      const newArr = shuffledResult.map((item) => {
        item.visible = false;
        return item;
      });
      setNumbers(newArr);
    }, 1000);
  }, []);

  const addPrimeNumberToArray = (array) => {
    const randomNumber = getRandomNumber();
    if (isPrime(randomNumber) && !hasPairNumberInArray(array, randomNumber)) {
      const elementFirst = {
        id: Date.now() * Math.random(),
        number: randomNumber,
        visible: true,
      };
      const elementSecond = {
        id: Date.now() * Math.random(),
        number: randomNumber,
        visible: true,
      };
      array.push(elementFirst, elementSecond);
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

  const makeItemsInvisibile = (itemFirst, itemSecond) => {
    const newMakeArr = numbers.map((item) => {
      if (itemFirst.id === item.id || itemSecond.id === item.id) {
        item.visible = false;
      }
      return item;
    });
    setNumbers(newMakeArr);
  };

  const handleClick = (elem) => {
    const newHandleArr = numbers.map((item) => {
      if (elem.id === item.id) {
        item.visible = true;
        if (!firstNumberInPair.id) {
          setFirstNumberInPair(item);
        } else if (firstNumberInPair.number === item.number) {
          setFirstNumberInPair({});
        } else if (firstNumberInPair.number != item.number) {
          setFirstNumberInPair({});
          setTimeout(() => makeItemsInvisibile(firstNumberInPair, item), 1000);
        }
      }
      return item;
    });
    setNumbers(newHandleArr);
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
                disabled={element.visible}
                onClick={() => handleClick(element)}
              >
                {element.visible ? element.number : ""}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
