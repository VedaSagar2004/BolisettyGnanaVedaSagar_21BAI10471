import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameCell } from '../components/GameCell';
import { AvailableMoves } from '../components/AvailableMoves';

export const Game = () => {
    const location = useLocation();
    const { state } = location;
    const [socket, setSocket] = useState(null)
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [pieceSelected, setPieceSeleted] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [selectedMove, setSelectedMove] = useState(null)
    const [availableMoves, setAvailableMoves] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [winner, setWinner] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        if (winner) {
          const timer = setTimeout(() => {
            navigate('/');
          }, 3000);
    
          return () => clearTimeout(timer);
        }
      }, [winner, navigate]);

    // useEffect to create a webSocket connection and handle incoming messages
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        console.log(ws);
        ws.onopen = () => {
            console.log('WebSocket Connected');
            setSocket(ws);
            if (localStorage.getItem("Id")){
                ws.send(JSON.stringify({ type: 'reconnect', Id: localStorage.getItem("Id")}));
            } else{
                ws.send(JSON.stringify({ type: 'init_game', order: state.order }));
            }
        };
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message === 'game_started') {
                localStorage.setItem("Id", data.Id)
                setGameState(data.board);
                setPlayer(data.player);
                setCurrentPlayer("Blue")
            } else if (data.type === 'move_list') {
                setAvailableMoves(data.message);
                if (typeof data.message != "object"){
                    return alert("Not your turn")
                }
                if ((typeof data.message == "object") && (data.message.length == 0)){
                    return alert("No valid moves")
                }
            } else if (data.type == "updated_board"){
                setGameState(data.message)
                setPieceSeleted(false)
                setCurrentPlayer(data.currTurn)
            } else if (data.type == "game_completed"){
                setWinner(data.winner)
                localStorage.removeItem("Id")
            } else if (data.type == "reconnected"){
                console.log(player)
                setGameState(data.board)
                setCurrentPlayer(data.currTurn)
                setPlayer(data.player)
            }

        };
        
        ws.onerror = (error) => {
            console.log('WebSocket Error: ', error);
            console.log(socket);
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
    // we display the winner and navigate to landing page
    if (winner){
        return <div className='bg-slate-950 min-h-screen flex items-center justify-center'>
            <div className='text-white text-5xl'>{winner} won the game</div>
        </div>
    }
    
    // handles character click logic
    const HandleClick = (cell) => {
        if (player == "Blue" && cell[2] == "r"){
            return alert("Not your Character")
        }
        if (player == "Red" && cell[2] == "b"){
            return alert("Not your Character")
        }
        if (cell == null){
            return
        }
        if (socket) {
            socket.send(JSON.stringify({ type: 'available_moves', piece: cell.slice(0,2)}));
            setPieceSeleted(true)
            setSelectedPiece(cell)
        }
        if (pieceSelected){
            setPieceSeleted(false)
        } 
    }

    // renders board and reverses according to player
    const RenderBoard = () => {
        let testBoard = gameState
        if (player !== "Blue") {
            testBoard = gameState.slice().reverse().map(row => row.slice().reverse());
        }
        return testBoard.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
                <GameCell onClick={() => HandleClick(cell)} key={`${rowIndex}-${cellIndex}`} piece={cell} />
            ))
        ));
    };

    // handle moves click logic
    const handleMovesClick = (move) => {
        if (socket) {
            socket.send(JSON.stringify({ type: 'move', piece: selectedPiece.slice(0,2), move}));
        }
    }

    // renders the board
    return (
        <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center">
            <div className="text-white">
                <h2 className="text-2xl mb-4">Current Turn: {currentPlayer}</h2>
                <div className="grid grid-cols-5 grid-rows-5 gap-1">
                    {RenderBoard()}
                </div>
            </div>
            {pieceSelected && <div className='flex gap-3 mt-8 '><AvailableMoves onCellClick={handleMovesClick} moveState= {setSelectedMove} movesArr={availableMoves}></AvailableMoves></div>}
        </div>
    );
};