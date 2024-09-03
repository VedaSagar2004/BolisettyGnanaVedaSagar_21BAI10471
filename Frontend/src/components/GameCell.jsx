
// game cell component
export const GameCell = ({ piece, onClick }) => {
    const renderPiece = (piece) => {
        let c = piece
        if (c){
            let color = c[2].toUpperCase()
            return {character: `${color}-${c.slice(0,2)}`, color}
        } else{
            return {character: ""}
        }   
    } 
    return (
        <div className="bg-slate-900 h-24 w-24 flex items-center justify-center">
            <div onClick={onClick} className={`text-2xl ${renderPiece(piece).color == 'B' ? 'text-blue-900' : 'text-red-800'} cursor-pointer`}>{renderPiece(piece).character}</div>
        </div>
    );
}

