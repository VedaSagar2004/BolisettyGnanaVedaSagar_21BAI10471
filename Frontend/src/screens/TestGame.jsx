import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GameCell } from '../components/GameCell';
import { AvailableMoves } from '../components/AvailableMoves';

export const TestGame = () => {
    const location = useLocation();
    const { state } = location;
    const [socket, setSocket] = useState(null)
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [pieceSelected, setPieceSeleted] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [selectedMove, setSelectedMove] = useState(null)
    const [availableMoves, setAvailableMoves] = useState([]);
    
    // useEffect to create a webSocket connection and handle incoming messages
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        console.log(ws);
        ws.onopen = () => {
            console.log('WebSocket Connected');
            setSocket(ws);
            ws.send(JSON.stringify({ type: 'init_game', order: state.order }));
        };
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message === 'game_started') {
                setGameState(data.board);
                setPlayer(data.player);
            } else if (data.type === 'move_list') {
                setAvailableMoves(data.message);
            } else if (data.type == "upated_board"){
                setGameState(data.message)
                console.log(gameState)
            }
        };
        
        ws.onerror = (error) => {
            console.log('WebSocket Error: ', error);
            console.log(socket);
            setError('Failed to connect to game server');
        };
        // clean up
        return () => {
            if (ws) {
                ws.close();
                setSocket(null);
            }
        };
    }, []);

    // if no gameState we render a waiting message
    if (!gameState) {
        return <div className="bg-slate-950 min-h-screen flex items-center justify-center">
            <div className='text-white text-5xl'>Waiting for opponent...</div>
        </div>;
    }
    
    // sending the available_moves message to get the available moves for the selected piece
    const handleCellClick = (row, col) => {
        if (socket) {
            socket.send(JSON.stringify({ type: 'available_moves', i: row, j: col }));
            setSelectedPiece({ row, col });
        }
    };

    
    const testHandleClick = (cell) => {
        if (player == "A" && cell[2] == "r"){
            return alert("Not your Character")
        }
        if (player == "B" && cell[2] == "b"){
            return alert("Not your Character")
        }
        if (cell == null){
            return
        }
        if (socket) {
            socket.send(JSON.stringify({ type: 'available_moves', piece: cell.slice(0,2)}));
        }
        if (pieceSelected){
            setPieceSeleted(false)
        } else{
            setPieceSeleted(true)
            setSelectedPiece(cell)
        }
    }

    const testRenderBoard = () => {
        let testBoard = gameState
        if (player !== "A") {
            testBoard = gameState.slice().reverse().map(row => row.slice().reverse());
        }
        return testBoard.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
                <GameCell onClick={() => testHandleClick(cell)} key={`${rowIndex}-${cellIndex}`} piece={cell} />
            ))
        ));
    };

    const handleMovesClick = (move) => {
        if (socket) {
            socket.send(JSON.stringify({ type: 'move', piece: selectedPiece.slice(0,2), move}));
        }
    }

    // renders the board
    return (
        <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center">
            <div className="text-white">
                <h2 className="text-2xl mb-4">Game Started!</h2>
                <div className="grid grid-cols-5 grid-rows-5 gap-1">
                    {testRenderBoard()}
                </div>
            </div>
            {pieceSelected && <div className='flex gap-3 mt-8 '><AvailableMoves onCellClick={handleMovesClick} moveState= {setSelectedMove} movesArr={availableMoves}></AvailableMoves></div>}
        </div>
    );
};