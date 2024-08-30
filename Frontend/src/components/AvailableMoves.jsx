import { MovesCell } from "./MovesCell"


export const AvailableMoves = ({movesArr, onCellClick}) => {
    if (typeof movesArr != "object"){
        return alert("Not your turn")
    }
    let arr = movesArr
    return arr.map((cell, cellIndex) => (
        <MovesCell onClick={() => {
            onCellClick(cell)
        }} key={`${cellIndex}`} move={cell} />
    ))
}