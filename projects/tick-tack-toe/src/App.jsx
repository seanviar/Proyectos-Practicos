import React, { useState } from "react";
import "./App.css";

function App() {

  const [board, setBoard] = useState(() => {
    const storageboard = window.localStorage.getItem("board")
    if (storageboard) return JSON.parse(storageboard)
    return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const storageturn = window.localStorage.getItem("turn")
    if (storageturn) return storageturn
    return "x"
  });

  const [ganador, setGanador] = useState();

  const [count, setCount] = useState(() => {
    const storagecount = window.localStorage.getItem("conunt")
    if (storagecount) return JSON.parse(storagecount)
    return 0
  });


  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const reset = () => {
    setBoard(Array(9).fill(null));
    setGanador(null);
    setCount(0);
    setTurn("x");
  };

  const changeTurn = (newTurn) => setTurn(newTurn);

  const functionWin = (board) => {
    for (let i = 0; i < winCombinations.length; i++) {
      if (
        board[winCombinations[i][0]] == "x" &&
        board[winCombinations[i][1]] == "x" &&
        board[winCombinations[i][2]] == "x"
      ) {
        setGanador("x");
        return "x";
      } else if (
        board[winCombinations[i][0]] == "o" &&
        board[winCombinations[i][1]] == "o" &&
        board[winCombinations[i][2]] == "o"
      ) {
        setGanador("o");
        return "o";
      }
    }
  };

  const empate = (newCount, newBoard) => {
    const newGanador = functionWin(newBoard);
    if (newCount == 9 && newGanador == null) {
      setGanador("empate");
    }
  };

  const saveGame = (newBoard, newTurn, newCount) => {
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("count", newCount);
    window.localStorage.setItem("turn", newTurn);
  };

  const handleClick = (index) => {
    if (!board[index] && !ganador) {
      const newBoard = board.map((ele, ind) =>
        ind == index ? (ele = turn) : ele
      );
      setBoard(newBoard);
      functionWin(newBoard);
      const newTurn = turn == "x" ? "o" : "x";
      changeTurn(newTurn);
      const newCount = count + 1;
      setCount(newCount);
      const newGanador = functionWin(newBoard);
      empate(newCount, newBoard, newGanador);
      saveGame(newBoard, newTurn, newCount);
    }
  };

  return (
    <>
      <section className="board">
        {board.map((ele, index) => (
          <div
            key={index}
            index={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {ele}
          </div>
        ))}
      </section>
      <section className="turno">
        <h3>turno de</h3>
        <div>{turn}</div>
      </section>

      {ganador == "x" || ganador == "o" ? (
        <>
          <div>gano {ganador}</div>
          <button onClick={reset}>jugar de nuevo</button>
        </>
      ) : ganador == "empate" ? (
        <section>
          <div>empate</div>
          <button onClick={reset}>jugar de nuevo</button>
        </section>
      ) : null}
    </>
  );
}

export default App;
