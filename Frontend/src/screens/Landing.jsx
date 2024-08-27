import { useState } from 'react';
// import { LandingCell } from './LandingCell';
import { Game } from './Game';

export const Landing = () => {
    const [order, setOrder] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    const handlePieceClick = (piece) => {
        setOrder(prevOrder => {
            if (prevOrder.includes(piece)) {
                return prevOrder.filter(p => p !== piece);
            } else if (prevOrder.length < 5) {
                return [...prevOrder, piece];
            }
            return prevOrder;
        });
    };

    const startGame = () => {
        if (order.length === 5) {
            setGameStarted(true);
        } else {
            alert("Please select 5 pieces before starting the game.");
        }
    };

    if (gameStarted) {
        return <Game order={order} />;
    }

    return (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="flex justify-evenly gap-2 mb-4">
                    <LandingCell piece="P1" onClick={() => handlePieceClick("P1")} isSelected={order.includes("P1")} />
                    <LandingCell piece="P2" onClick={() => handlePieceClick("P2")} isSelected={order.includes("P2")} />
                    <LandingCell piece="P3" onClick={() => handlePieceClick("P3")} isSelected={order.includes("P3")} />
                    <LandingCell piece="H1" onClick={() => handlePieceClick("H1")} isSelected={order.includes("H1")} />
                    <LandingCell piece="H2" onClick={() => handlePieceClick("H2")} isSelected={order.includes("H2")} />
                </div>
                <div className="text-white mb-4">
                    Selected Order: {order.join(", ")}
                </div>
                <button 
                    onClick={startGame}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
}

export const LandingCell = ({ piece, onClick, isSelected }) => {
    return (
        <div 
            onClick={onClick} 
            className={`bg-slate-700 border-2 ${isSelected ? 'border-yellow-500' : 'border-white'} cursor-pointer transition-colors`}
        >
            <div className="text-3xl text-white p-20">{piece}</div>
        </div>
    );
}