import { Validation } from "./Validation.js"

export class AvailableMoves {

    // in this method we create a empty array and a instance of the Validation class
    // we check if each move is valid and push it to the available array and return it
    
    pawn(board, player, i, j){
        let valid = new Validation()
        let available = []
        if (player == 1){
            if (valid.pawn("F", i, j, 1, board)){
                available.push("F")
            }
            if (valid.pawn("L", i, j, 1, board)){
                available.push("L")
            }
            if (valid.pawn("R", i, j, 1, board)){
                available.push("R")
            }
            if (valid.pawn("B", i, j, 1, board)){
                available.push("B")
            }
        }
        else{
            if (valid.pawn("F", i, j, 2, board)){
                available.push("F")
            }
            if (valid.pawn("L", i, j, 2, board)){
                available.push("L")
            }
            if (valid.pawn("R", i, j, 2, board)){
                available.push("R")
            }
            if (valid.pawn("B", i, j, 2, board)){
                available.push("B")
            }
        }
        return available
    }

    hero1(board, player, i, j){
        let valid = new Validation()
        let available = []
        if (player == 1){
            if (valid.hero1("F", i, j, 1, board)){
                available.push("F")
            }
            if (valid.hero1("L", i, j, 1, board)){
                available.push("L")
            }
            if (valid.hero1("R", i, j, 1, board)){
                available.push("R")
            }
            if (valid.hero1("B", i, j, 1, board)){
                available.push("B")
            }
        }
        else{
            if (valid.hero1("F", i, j, 2, board)){
                available.push("F")
            }
            if (valid.hero1("L", i, j, 2, board)){
                available.push("L")
            }
            if (valid.hero1("R", i, j, 2, board)){
                available.push("R")
            }
            if (valid.hero1("B", i, j, 2, board)){
                available.push("B")
            }
        }
        return available
    }

    hero2(board, player, i, j){
        let valid = new Validation()
        let available = []
        if (player == 1){
            if (valid.hero2("FR", i, j, 1, board)){
                available.push("FR")
            }
            if (valid.hero2("FL", i, j, 1, board)){
                available.push("FL")
            }
            if (valid.hero2("BR", i, j, 1, board)){
                available.push("BR")
            }
            if (valid.hero2("BL", i, j, 1, board)){
                available.push("BL")
            }
        }
        else{
            if (valid.hero2("FR", i, j, 2, board)){
                available.push("FR")
            }
            if (valid.hero2("FL", i, j, 2, board)){
                available.push("FL")
            }
            if (valid.hero2("BR", i, j, 2, board)){
                available.push("BR")
            }
            if (valid.hero2("BL", i, j, 2, board)){
                available.push("BL")
            }
        }
        return available
    }
}