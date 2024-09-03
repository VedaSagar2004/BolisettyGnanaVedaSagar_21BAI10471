export const MoveList = ({ moveHistory }) => {
let moveHistoryArr = moveHistory
const formatPiece = (piece) => {
    if (!piece){
        return ""
    }
    const character = piece.slice(0,2);
    const player = piece[2].toUpperCase();
    return `${player}-${character}`
};

const renderMove = (moveArray, index) => {
    const [piece, moveMade, captured1, captured2] = moveArray;
    const formattedPiece = formatPiece(piece);
    let capturedText = "" 
    if (captured1 && captured2){
        capturedText = `(captured ${formatPiece(captured1)}, ${formatPiece(captured2)})`
    } else if (captured1 && !captured2){
        capturedText = `(captured ${formatPiece(captured1)})`
    } else if (!captured1 && captured2){
        capturedText = `(captured ${formatPiece(captured2)})`
    }

    return (
    <div key={index} className="mb-2">
        {`• ${formattedPiece}: ${moveMade} `} <span className="text-red-700">{`${capturedText}`}</span>
    </div>
    );
};

return (
    <div className="border border-gray-300 rounded p-2">
    <div className="font-bold mb-2 text-white">Move History</div>
    <div className="max-h-96 overflow-y-auto text-white">
        {moveHistoryArr.map((move, index) => renderMove(move, index))}
    </div>
    </div>
);
};