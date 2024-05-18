
import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

import { WINNING_COMBINATIONS } from "./winning-combinations"

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O'

  return currentPlayer
}

//we call these functions defined outside of our App helper functions. THEY MUST RETURN SOMETHING (similar to computed in vue)
function deriveWinner(gameBoard, players) {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    // Extract individual squares in the combination from the game board
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


    // Check if all three squares are the same and not empty
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {

      console.log(players);

      // If condition is true, a player has filled this combination
      // Update the winner variable with the symbol of the winning player
      winner = players[firstSquareSymbol];

    }

    return winner
  }
}
function derivegameBoard(gameTurns) {
  // without making gameboard into a deep copy of the initial game board, our rematch button to reset the gameboard would not work as when we try to clear the gameboard it does not override
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  for (const turn of gameTurns) {
    // destructure our object
    const { square, player } = turn
    const { row, col } = square

    // we update our previous game board with the player information (X / O)
    gameBoard[row][col] = player // either X or O
  }

  return gameBoard
}



function App() {
  const [gameTurns, setGameTurns] = useState([])

  const [players, setPlayers] = useState(PLAYERS)

  // now we derive our active player from 1 state instead of creating a new state just for an active player
  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = derivegameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)


  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      // we save the turns inside of a deep copy of our gameTurns
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]

      return updatedTurns
    })
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...setPlayers,
        // we can overide an existing property with the spread operator of an object by using the key as an argument. This requires us to wrap the key in an array, this is when the key is a dynamic property 
        [symbol]: newName
      }
    })
  }

  return (
    <main>

      <div id='game-container'>
        <ol id='players' className="highlight-player" >
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS['X']} symbol='X' isActive={activePlayer === 'X'} ></Player>
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS['O']} symbol='O' isActive={activePlayer === 'O'}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRematch} winner={winner}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} ></GameBoard>

      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
