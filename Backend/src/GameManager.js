import { Game } from "./Game.js"
import { AVAILABLE, INIT_GAME, MOVE } from "./Messages.js"
import { User } from "./User.js"

export class GameManager {
    constructor(){
        this.games = []
        this.users = []
        this.pendingUser = null
    }

    addUser(socket,){
        this.users.push(this.player)
        this.messageHandler(socket)
    }

    removeUser(socket){
        this.users = this.users.filter(user => user.socket !== socket)
    }

    messageHandler(socket){
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString())

            if (message.type === INIT_GAME){
                if (this.pendingUser){
                    const game = new Game(this.pendingUser.socket, socket, this.pendingUser.order, message.order)
                    this.games.push(game)
                    this.pendingUser.socket.send(JSON.stringify({
                        message: "game_started",
                        board: game.board,
                        player: "A"
                    }))
                    socket.send(JSON.stringify({
                        message: "game_started",
                        board: game.board,
                        player: "B"
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
        })
    }
}