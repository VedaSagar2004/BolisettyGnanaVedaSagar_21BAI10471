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
                        player: "A",
                        Id: game.player1Id
                    }))
                    socket.send(JSON.stringify({
                        message: "game_started",
                        board: game.board,
                        player: "B",
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
                    let winner = game.gameWinner()
                    if (winner.completed){
                        socket.send(JSON.stringify({
                            message: winner.message
                        }))
                        game.player1.close()
                        game.player2.close()
                    }
                    socket.send(JSON.stringify({
                        message: board
                    }))
                }
            }

            // returns the available moves for the given piece
            if (message.type === AVAILABLE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
                if (game){
                    let arr = game.moves(socket, message.i, message.j)
                    socket.send(JSON.stringify({
                        type: "move_list",
                        message: arr
                    }))
                }
            }
            // we find the game by user id and update the socket in the game class
            if (message.type === RECONNECT){
                const game = this.games.find(game => game.player1Id === message.Id || game.player2Id === message.Id)
                if (game){
                    if (game.player1Id == message.Id){
                        if (game.currentTurn == game.player1){
                            game.currentTurn = socket
                        }
                        game.player1 = socket
                    }
                    else{
                        if (game.currentTurn == game.player2){
                            game.currentTurn = socket
                        }
                        game.player2 = socket
                    }
                    socket.send(JSON.stringify({
                        message: "reconnected"
                    }))
                }
            }
        })
    }
}
