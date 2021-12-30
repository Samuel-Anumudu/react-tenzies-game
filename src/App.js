import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Die from "./component/Die/Die";
import Confetti from "react-confetti";
import "./style.css";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newArry = [];
    for (let i = 0; i < 10; i++) {
      newArry.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: i,
      });
    }
    return newArry;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die, index) => {
        return die.isHeld
          ? die
          : {
              value: Math.floor(Math.random() * 6 + 1),
              isHeld: false,
              id: index,
            };
      })
    );
  }

  function playNewGame() {
    setDice(allNewDice());
    setTenzies(false);
  }

  const diceElements = dice.map((die) => (
    <Die
      getDiceId={() => holdDice(die.id)}
      isHeld={die.isHeld}
      value={die.value}
      key={die.id}
    />
  ));

  const { width, height } = useWindowSize();

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      {tenzies ? (
        <button className="roll-dice" onClick={playNewGame}>
          New Game
        </button>
      ) : (
        <button className="roll-dice" onClick={rollDice}>
          Roll
        </button>
      )}
    </main>
  );
}
