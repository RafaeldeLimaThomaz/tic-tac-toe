import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

const RedLine = ({ startX, startY, endX, endY }) => {
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

  const lineStyle = {
    position: 'absolute',
    top: `${startY}px`,
    left: `${startX}px`,
    width: `${length}px`,
    height: '2px', 
    background: 'red',
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0% 50%', 
  };

  return <div className="red-line" style={lineStyle}></div>;
};

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner[0];
    var startX = 0;
    var endX = 0;
    var startY = 0;
    var endY = 0;

    switch(`${winner[1]}-${winner[2]}`) {

      
      case '0-1':
        startY = endY = 64;
        startX = 20;
        endX = 120;
        break;
  
        case '3-4':
        startY = endY = 97;
        startX = 20;
        endX = 120;
        break;
  
        case '6-7':
        startY = endY = 129;
        startX = 20;
        endX = 120;
        break;
  
        case '0-3':
        startY = 47;
        endY = 146;
        startX = endX = 36;
        break;
  
        case '1-4':
        startY = 47;
        endY = 146;
        startX = endX = 69;
        break;
  
        case '2-5':
        startY = 47;
        endY = 146;
        startX = endX = 102;
        break;
  
        case '0-4':
        startY = 47;
        endY = 146;
        startX = 20;
        endX = 120;
        break;
  
        case '2-4':
        startY = 47;
        endY = 146;
        startX = 120;
        endX = 20;
        break;
    }
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {winner && <RedLine 
      startX={startX} 
      startY={startY} 
      endX={endX} 
      endY={endY} 
      />}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b];
    }
  }
  return null;
}
