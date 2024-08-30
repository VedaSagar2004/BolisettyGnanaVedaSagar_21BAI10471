
// game cell component
export const GameCell = ({ piece, onClick }) => {
    const renderPiece = (piece) => {
        let c = piece
        if (c){
            return {character: c.slice(0,2), color: c[2]}
        } else{
            return ""
        }
    } 
    return (
        <div className="bg-slate-900">
            <div onClick={onClick} className={`text-2xl ${renderPiece(piece).color == 'b' ? 'text-blue-900' : 'text-red-800'} p-7 cursor-pointer`}>{renderPiece(piece).character}</div>
        </div>
    );
}

