
export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {
                board.map((row, rowIndex) => (
                    // by allocating the keys we make it possible to update the values of the empty boxes using XY coordinating
                    <li key={rowIndex} >
                        <ol>
                            {row.map((playerSymbol, colIndex) => (
                                <li key={colIndex}>
                                    <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null} >{playerSymbol}</button>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))
            }
        </ol>

    )
}