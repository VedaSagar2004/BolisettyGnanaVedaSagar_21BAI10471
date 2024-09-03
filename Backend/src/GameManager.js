import { Game } from "./Game.js"
import { AVAILABLE, INIT_GAME, MOVE, RECONNECT } from "./Messages.js"
import { User } from "./User.js"

// we maintain all the games in a array
// initilize pending user to null
export class GameManager {
    constructor(){
        this.games = []
        this.users = []
        this.pendingUser = null
    }

// push the user to array and handle messages
    addUser(socket,){
        this.users.push(this.player)
        this.messageHandler(socket)
    }

// remove user on disconnect or game completion
    removeUser(socket){
        this.users = this.users.filter(user => user.socket !== socket)
    }

// we have 3 types of messages
    messageHandler(socket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString())

            // checks if a pending user is present if not makes the current user a pending user
            // if pending user is present we create a game between them with their respective orders
            if (message.type === INIT_GAME){
                if (this.pendingUser){
                    const game = new Game(this.pendingUser.socket, socket, this.pendingUser.order, message.order)
                    this.games.push(game)
                    this.pendingUser.socket.send(JSON.stringify({
                        message: "game_started",
                        board: game.board,
                        player: "B",
                        Id: game.player1Id
                    }))
                    socket.send(JSON.stringify({
                        message: "game_started",
                        board: game.board,
                        player: "A",
                        Id: game.player2Id
                    }))
                    this.pendingUser = null
                }
                else {
                    this.pendingUser = new User(socket, message.order)
                    this.pendingUser.socket.send(JSON.stringify({
                        message: "waiting for player to join"
                    }))
                }
            }

            // moves the piece and kills any character if any and returns the updated board
            // we also check if the game is completed and declare the winner and close the connection
            if (message.type === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if (game){
                    let board = game.makeMove(message.move, message.piece, socket)
                    if (board.error){
                        socket.send(JSON.stringify({
                            message: board.error
                        }))
                    }
                    let winnerData = game.gameWinner()
                    if (winnerData.completed){
                        game.player1.send(JSON.stringify({
                            type: "game_completed",
                            message: winnerData.message,
                            winner: winnerData.playerWon
                        }))
                        game.player2.send(JSON.stringify({
                            type: "game_completed",
                            message: winnerData.message,
                            winner: winnerData.playerWon
                        }))
                        game.player1.close()
                        game.player2.close()
                    }
                    let currTurn
                    if (socket == game.player1){
                        currTurn = "A"
                    } else{
                        currTurn = "B"
                    }
                    game.player1.send(JSON.stringify({
                        type: "updated_board",
                        message: board.updatedBoard,
                        history: board.history,
                        currTurn
                    }))
                    game.player2.send(JSON.stringify({
                        type: "updated_board",
                        message: board.updatedBoard,
                        history: board.history,
                        currTurn
                    }))
                }
            }

            // returns the available moves for the given piece
            if (message.type === AVAILABLE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if (game){
                    let a = game.moves(socket, message.piece)
                    if (a.error){
                        socket.send(JSON.stringify({
                            message: a.error
                        }))
                    }
                    socket.send(JSON.stringify({
                        type: "move_list",
                        message: a.arr,
                        board: a.b
                    }))
                }
            }
            // we find the game by user id and update the socket in the game class
            if (message.type === RECONNECT){
                const game = this.games.find(game => game.player1Id === message.Id || game.player2Id === message.Id)
                let currTurn, player
                if (game){
                    if (game.player1Id == message.Id){
                        if (game.currentTurn == game.player1){
                            game.currentTurn = socket
                            currTurn = "B"
                        }
                        game.player1 = socket
                        player = "B"
                    }
                    else{
                        if (game.currentTurn == game.player2){
                            game.currentTurn = socket
                            currTurn = "A"
                        }
                        game.player2 = socket
                        player = "A"
                    }
                    socket.send(JSON.stringify({
                        type: "reconnected",
                        message: "reconnected",
                        board: game.board,
                        currTurn,
                        player
                    }))
                }
            }
        })
    }
}
