import { MovesCell } from "./MovesCell"

// return moves component
export const AvailableMoves = ({movesArr, onCellClick}) => {
    if (typeof movesArr != "object"){
        return alert("Not your turn")
    }
    let arr = movesArr
    if (arr.length == 0){
        return alert("No valid moves")
    }
    return arr.map((cell, cellIndex) => (
        <MovesCell onClick={() => {
            onCellClick(cell)
        }} key={`${cellIndex}`} move={cell} />
    ))
}