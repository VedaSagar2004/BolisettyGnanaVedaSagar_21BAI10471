import { useState, useEffect } from 'react';

export const Game = ({ order }) => {
    const [socket, setSocket] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [error, setError] = useState(null);
    const [player, setPlayer] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [availableMoves, setAvailableMoves] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        console.log(ws);
        ws.onopen = () => {
            console.log('WebSocket Connected');
            setSocket(ws);
            ws.send(JSON.stringify({ type: 'init_game', order }));
        };
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message === 'game_started') {
                setGameState(data.board);
                setPlayer(data.player);
            } else if (data.type === 'move_list') {
                setAvailableMoves(data.message);
            }
        };
        
        ws.onerror = (error) => {
            console.log('WebSocket Error: ', error);
            console.log(socket);
            setError('Failed to connect to game server');
        };

        return () => {
            if (ws) {
                ws.close();
                setSocket(null);
            }
        };
    }, []);

    if (!gameState) {
        return <div className="text-white">Waiting for opponent...</div>;
    }
    
    const handleCellClick = (row, col) => {
        if (socket) {
            socket.send(JSON.stringify({ type: 'available_moves', i: row, j: col }));
            setSelectedPiece({ row, col });
        }
    };

    const isMoveAvailable = (direction) => {
        return availableMoves.includes(direction);
    };

    const getAvailableCell = (row, col) => {
        if (!selectedPiece) return false;

        const piece = gameState[selectedPiece.row][selectedPiece.col];
        const rowDiff = row - selectedPiece.row;
        const colDiff = col - selectedPiece.col;

        // Reverse the direction for white player
        const multiplier = player === "B" ? 1 : -1;

        switch (piece) {
            case 'P1':
            case 'P2':
            case 'P3':
                return (
                    (isMoveAvailable('F') && rowDiff === -1 * multiplier && colDiff === 0) ||
                    (isMoveAvailable('R') && rowDiff === 0 && colDiff === 1 * multiplier) ||
                    (isMoveAvailable('L') && rowDiff === 0 && colDiff === -1 * multiplier) ||
                    (isMoveAvailable('B') && rowDiff === 1 * multiplier && colDiff === 0)
                );
            case 'H1':
                return (
                    (isMoveAvailable('F') && rowDiff === -2 * multiplier && colDiff === 0) ||
                    (isMoveAvailable('R') && rowDiff === 0 && colDiff === 2 * multiplier) ||
                    (isMoveAvailable('L') && rowDiff === 0 && colDiff === -2 * multiplier) ||
                    (isMoveAvailable('B') && rowDiff === 2 * multiplier && colDiff === 0)
                );
            case 'H2':
                return (
                    (isMoveAvailable('FR') && rowDiff === -2 * multiplier && colDiff === 2 * multiplier) ||
                    (isMoveAvailable('FL') && rowDiff === -2 * multiplier && colDiff === -2 * multiplier) ||
                    (isMoveAvailable('BR') && rowDiff === 2 * multiplier && colDiff === 2 * multiplier) ||
                    (isMoveAvailable('BL') && rowDiff === 2 * multiplier && colDiff === -2 * multiplier)
                );
            default:
                return false;
        }
    };

    const renderBoard = () => {
        let boardToRender = gameState;

        if (player !== "B") {
            boardToRender = gameState.slice().reverse().map(row => row.slice().reverse());
        }

        return boardToRender.map((row, i) => 
            row.map((cell, j) => {
                const isSelected = selectedPiece && selectedPiece.row === i && selectedPiece.col === j;
                const isAvailable = getAvailableCell(i, j);
                
                return (
                    <div
                        key={`${i}-${j}`}
                        className={`w-16 h-16 flex items-center justify-center border border-white cursor-pointer
                            ${isSelected ? 'bg-blue-500' : isAvailable ? 'bg-green-500' : 'bg-slate-700'}`}
                        onClick={() => handleCellClick(i, j)}
                    >
                        {cell}
                    </div>
                );
            })
        );
    };

    return (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center">
            <div className="text-white">
                <h2 className="text-2xl mb-4">Game Started!</h2>
                <div className="grid grid-cols-5 gap-1">
                    {renderBoard()}
                </div>
            </div>
        </div>
    );
};