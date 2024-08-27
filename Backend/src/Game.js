import { AvailableMoves } from "./AvailableMoves.js"
import { Board } from "./Board.js"
import { Move } from "./Move.js"
import { Validation } from "./Validation.js"


export class Game {

    // intializing with player1 socket, player2 socket
    // current turn default as player 1
    // creates a board from the board class
    // creates player1 and player2 map from the position method from board class

    constructor(player1, player2, order1, order2){
        this.player1 = player1
        this.player2 = player2
        this.currentTurn = player1
        this.state = new Board()
        this.board = this.state.board()
        this.playermap1 = this.state.position(order1, 1)
        this.playermap2 = this.state.position(order2, 2)
    }

    // in this method we make the move and return the updated board
    // we create instances of the Validation, Move, AvailableMoves classes and use them accordingly

    makeMove(move, piece, socket){
        const validation = new Validation()
        const moveValidation = new Move()
        const available = new AvailableMoves()
        let i, j

        // if its not their turn we simply return a message 
        if (socket != this.currentTurn){
            return {error: "this is not your turn"}
        }
        // we are assigning the i, j values from thir maps
        if (socket == this.player1){
            i = Number(this.playermap1.get(piece.concat('b'))[0])
            j = Number(this.playermap1.get(piece.concat('b'))[1])
        }
        else {
            i = Number(this.playermap2.get(piece.concat('r'))[0])
            j = Number(this.playermap2.get(piece.concat('r'))[1])
        }

        // we validate the move and then make the move
        if (piece == 'P1' || piece == 'P2' || piece == 'P3'){
            if (socket == this.player1){
                if (validation.pawn(move, i, j, 1, this.board)){
                    moveValidation.pawn(this.playermap1, this.playermap2, this.board, i, j, 1, move)
                } 
            }
            else{
                if (validation.pawn(move, i, j, 2, this.board)){
                    moveValidation.pawn(this.playermap1, this.playermap2, this.board, i, j, 2, move)
                }
            }
            
        }
        if (piece == 'H1'){
            if (socket == this.player1){
                if (validation.hero1(move, i, j, 1, this.board)){
                    moveValidation.hero1(this.playermap1, this.playermap2, this.board, i, j, 1, move)
                }
            }
            else{
                if (validation.hero1(move, i, j, 2, this.board)){
                    moveValidation.hero1(this.playermap1, this.playermap2, this.board, i, j, 2, move)
                }
            }
        }
        if (piece == 'H2'){
            if (socket == this.player1){
                if (validation.hero2(move, i, j, 1, this.board)){
                    moveValidation.hero2(this.playermap1, this.playermap2, this.board, i, j, 1, move)
                }
            }
            else{
                if (validation.hero2(move, i, j, 2, this.board)){
                    moveValidation.hero2(this.playermap1, this.playermap2, this.board, i, j, 2, move)
                }
            }
        }

        // we change the current turn of the player
        if (this.currentTurn == this.player1){
            this.currentTurn = this.player2
        }
        else{
            this.currentTurn = this.player1
        }
        return this.board
    }

    // checks if the any of the maps is empty to declare the winner
    gameWinner(){
        if (this.playermap1.size == 0){
            return {message: "player 2 won", completed: true}
        }
        else if (this.playermap2.size == 0){
            return {message: "player 1 won", completed: true}
        }
        else{
            return {message: "continue game", completed: false}
        }
    }

    // we are returning the available moves with this method
    moves(socket, i, j){
        const available = new AvailableMoves()
        let movesArr
        if (socket != this.currentTurn){
            return {error: "this is not your turn"}
        }
        if (this.board[i][j][0] == 'P'){
            if (socket == this.player1){
                movesArr = available.pawn(this.board, 1, i, j)
                 
            }
            else{
                movesArr = available.pawn(this.board, 2, i, j)
            }
            
        }
        if (this.board[i][j][0] == 'H' && this.board[i][j][1] == '1'){
            if (socket == this.player1){
                movesArr = available.hero1(this.board, 1, i, j)
            }
            else{
                movesArr = available.hero1(this.board, 2, i, j)
            }
        }
        if (this.board[i][j][0] == 'H' && this.board[i][j][1] == '2'){
            if (socket == this.player1){
                movesArr = available.hero2(this.board, 1, i, j)
            }
            else{
                movesArr = available.hero2(this.board, 2, i, j)
            }
        }
        return movesArr
    }
}
