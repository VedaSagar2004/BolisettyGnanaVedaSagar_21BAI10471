export class Move {
    
    // in this method we take both the player maps
    // if the destination square has a piece we replace it and remove the piece from the opponent map
    // for the hero moves if there are pieces in its path we also remove them from the opponent map and also update the board
    // this method returns nothing but it modifies the maps and the board
    // [null, null, null, null]
    // first value is the piece
    // second is the move made
    // third, fourth are the pieces captured
    pawn(map1, map2, board, i, j, player, move){
        let moveMade = [board[i][j], null, null, null]
        if (player == 1){
            if (move == 'F'){
                moveMade[1] = "F"
                if (board[i-1][j]){
                    map2.delete(board[i-1][j])
                    moveMade[2] = board[i-1][j]
                }
                let positionString = (i-1).toString().concat(j.toString())
                map1.set(board[i][j], positionString)
                board[i-1][j] = board[i][j]
                board[i][j] = null
            }
            if (move == 'L'){
                moveMade[1] = "L"
                if (board[i][j-1]){
                    map2.delete(board[i][j-1])
                    moveMade[2] = board[i][j-1]
                }
                let positionString = i.toString().concat((j-1).toString())
                map1.set(board[i][j], positionString)
                board[i][j-1] = board[i][j]
                board[i][j] = null
            }
            if (move == 'R'){
                moveMade[1] = "R"
                if (board[i][j+1]){
                    map2.delete(board[i][j+1])
                    moveMade[2] = board[i][j+1]
                }
                let positionString = i.toString().concat((j+1).toString())
                map1.set(board[i][j], positionString)
                board[i][j+1] = board[i][j]
                board[i][j] = null
            }
            if (move == 'B'){
                moveMade[1] = "B"
                if (board[i+1][j]){
                    map2.delete(board[i+1][j])
                    moveMade[2] = board[i+1][j]
                }
                let positionString = (i+1).toString().concat(j.toString())
                map1.set(board[i][j], positionString)
                board[i+1][j] = board[i][j]
                board[i][j] = null
            }
        }
        else {
            if (move == 'F'){
                moveMade[1] = "F"
                if (board[i+1][j]){
                    map1.delete(board[i+1][j])
                    moveMade[2] = board[i+1][j]
                }
                let positionString = (i+1).toString().concat(j.toString())
                map2.set(board[i][j], positionString)
                board[i+1][j] = board[i][j]
                board[i][j] = null
            }
            if (move == 'R'){
                moveMade[1] = "R"
                if (board[i][j-1]){
                    map1.delete(board[i][j-1])
                    moveMade[2] = board[i][j-1]
                }
                let positionString = i.toString().concat((j-1).toString())
                map2.set(board[i][j], positionString)
                board[i][j-1] = board[i][j]
                board[i][j] = null
            }
            if (move == 'L'){
                moveMade[1] = "L"
                if (board[i][j+1]){
                    map1.delete(board[i][j+1])
                    moveMade[2] = board[i][j+1]
                }
                let positionString = i.toString().concat((j+1).toString())
                map2.set(board[i][j], positionString)
                board[i][j+1] = board[i][j]
                board[i][j] = null
            }
            if (move == 'B'){
                moveMade[1] = "B"
                if (board[i-1][j]){
                    map1.delete(board[i-1][j])
                    moveMade[2] = board[i-1][j]
                }
                let positionString = (i+1).toString().concat(j.toString())
                map2.set(board[i][j], positionString)
                board[i-1][j] = board[i][j]
                board[i][j] = null
            }
        }
        return moveMade
    }

    hero1(map1, map2, board, i, j, player, move){
        let moveMade = [board[i][j], null, null, null]
        if (player == 1){
            if (move == 'F'){
                moveMade[1] = "F"
                if (board[i-1][j]){
                    map2.delete(board[i-1][j])
                    moveMade[2] = board[i-1][j]
                    board[i-1][j] = null
                }
                if (board[i-2][j]){
                    map2.delete(board[i-2][j])
                    moveMade[3] = board[i-2][j]
                }
                let positionString = (i-2).toString().concat(j.toString())
                map1.set(board[i][j], positionString)
                board[i-2][j] = board[i][j]
                board[i][j] = null
                console.log(board, map1, map2)
            }
            if (move == 'L'){
                moveMade[1] = "L"
                if (board[i][j-1]){
                    map2.delete(board[i][j-1])
                    moveMade[2] = board[i][j-1]
                    board[i][j-1] = null
                }
                if (board[i][j-2]){
                    map2.delete(board[i][j-2])
                    moveMade[3] = board[i][j-2]
                }
                let positionString = i.toString().concat((j-2).toString())
                map1.set(board[i][j], positionString)
                board[i][j-2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'R'){
                moveMade[1] = "R"
                if (board[i][j+1]){
                    map2.delete(board[i][j+1])
                    moveMade[2] = board[i][j+1]
                    board[i][j+1] = null
                }
                if (board[i][j+2]){
                    map2.delete(board[i][j+2])
                    moveMade[3] = board[i][j+2]
                }
                let positionString = i.toString().concat((j+2).toString())
                map1.set(board[i][j], positionString)
                board[i][j+2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'B'){
                moveMade[1] = "B"
                if (board[i+1][j]){
                    map2.delete(board[i+1][j])
                    moveMade[2] = board[i+1][j]
                    board[i+1][j] = null
                }
                if (board[i+2][j]){
                    map2.delete(board[i+2][j])
                    moveMade[3] = board[i+2][j]
                }
                let positionString = (i+2).toString().concat(j.toString())
                map1.set(board[i][j], positionString)
                board[i+2][j] = board[i][j]
                board[i][j] = null
            }
        }
        else {
            if (move == 'F'){
                moveMade[1] = "F"
                if (board[i+1][j]){
                    map1.delete(board[i+1][j])
                    moveMade[2] = board[i+1][j]
                    board[i+1][j] = null
                }
                if (board[i+2][j]){
                    map1.delete(board[i+2][j])
                    moveMade[3] = board[i+2][j]
                }
                let positionString = (i+2).toString().concat(j.toString())
                map2.set(board[i][j], positionString)
                board[i+2][j] = board[i][j]
                board[i][j] = null
            }
            if (move == 'R'){
                moveMade[1] = "R"
                if (board[i][j-1]){
                    map1.delete(board[i][j-1])
                    moveMade[2] = board[i][j-1]
                    board[i][j-1] = null
                }
                if (board[i][j-2]){
                    map1.delete(board[i][j-2])
                    moveMade[3] = board[i][j-2]
                }
                let positionString = i.toString().concat((j-2).toString())
                map2.set(board[i][j], positionString)
                board[i][j-2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'L'){
                moveMade[1] = "L"
                if (board[i][j+1]){
                    map1.delete(board[i][j+1])
                    moveMade[2] = board[i][j+1]
                    board[i][j+1] = null
                }
                if (board[i][j+2]){
                    map1.delete(board[i][j+2])
                    moveMade[3] = board[i][j+2]
                }
                let positionString = i.toString().concat((j+2).toString())
                map2.set(board[i][j], positionString)
                board[i][j+2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'B'){
                moveMade[1] = "B"
                if (board[i-1][j]){
                    map1.delete(board[i-1][j])
                    moveMade[2] = board[i-1][j]
                    board[i-1][j] = null
                }
                if (board[i-2][j]){
                    map1.delete(board[i-2][j])
                    moveMade[3] = board[i-2][j]
                }
                let positionString = (i-2).toString().concat(j.toString())
                map2.set(board[i][j], positionString)
                board[i-2][j] = board[i][j]
                board[i][j] = null
            }
        }
        return moveMade
    }

    hero2(map1, map2, board, i, j, player, move){
        let moveMade = [board[i][j], null, null, null]
        if (player == 1){
            if (move == 'FR'){
                moveMade[1] = "FR"
                if (board[i-1][j+1]){
                    map2.delete(board[i-1][j+1])
                    moveMade[2] = board[i-1][j+1]
                    board[i-1][j+1] = null
                }
                if (board[i-2][j+2]){
                    map2.delete(board[i-2][j+2])
                    moveMade[3] = board[i-2][j+2]
                }
                let positionString = (i-2).toString().concat((j+2).toString())
                map1.set(board[i][j], positionString)
                board[i-2][j+2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'FL'){
                moveMade[1] = "F"
                if (board[i-1][j-1]){
                    map2.delete(board[i-1][j-1])
                    moveMade[2] = board[i-1][j-1]
                    board[i-1][j-1] = null
                }
                if (board[i-2][j-2]){
                    map2.delete(board[i-2][j-2])
                    moveMade[3] = board[i-2][j-2]
                }
                let positionString = (i-2).toString().concat((j-2).toString())
                map1.set(board[i][j], positionString)
                board[i-2][j-2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'BR'){
                moveMade[1] = "BR"
                if (board[i+1][j+1]){
                    map2.delete(board[i+1][j+1])
                    moveMade[2] = board[i+1][j+1]
                    board[i+1][j+1] = null
                }
                if (board[i+2][j+2]){
                    map2.delete(board[i+2][j+2])
                    moveMade[3] = board[i+2][j+2]
                }
                let positionString = (i+2).toString().concat((j+2).toString())
                map1.set(board[i][j], positionString)
                board[i+2][j+2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'BL'){
                moveMade[1] = "BL"
                if (board[i+1][j-1]){
                    map2.delete(board[i+1][j-1])
                    moveMade[2] = board[i+1][j-1]
                    board[i+1][j-1] = null
                }
                if (board[i+2][j-2]){
                    map2.delete(board[i+2][j-2])
                    moveMade[3] = board[i+2][j-2]
                }
                let positionString = (i+2).toString().concat((j-2).toString())
                map1.set(board[i][j], positionString)
                board[i+2][j-2] = board[i][j]
                board[i][j] = null
            }
        }
        else {
            if (move == 'FR'){
                moveMade[1] = "FR"
                if (board[i+1][j-1]){
                    map1.delete(board[i+1][j-1])
                    moveMade[2] = board[i+1][j-1]
                    board[i+1][j-1] = null
                }
                if (board[i+2][j-2]){
                    map1.delete(board[i+2][j-2])
                    moveMade[3] = board[i+2][j-2]
                }
                let positionString = (i+2).toString().concat((j-2).toString())
                map2.set(board[i][j], positionString)
                board[i+2][j-2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'FL'){
                moveMade[1] = "FL"
                if (board[i+1][j+1]){
                    map1.delete(board[i+1][j+1])
                    moveMade[2] = board[i+1][j+1]
                    board[i+1][j+1] = null
                }
                if (board[i+2][j+2]){
                    map1.delete(board[i+2][j+2])
                    moveMade[3] = board[i+2][j+2]
                }
                let positionString = (i+2).toString().concat((j+2).toString())
                map2.set(board[i][j], positionString)
                board[i+2][j+2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'BL'){
                moveMade[1] = "BL"
                if (board[i-1][j+1]){
                    map1.delete(board[i-1][j+1])
                    moveMade[2] = board[i-1][j+1]
                    board[i-1][j+1] = null
                }
                if (board[i-2][j+2]){
                    map1.delete(board[i-2][j+2])
                    moveMade[3] = board[i-2][j+2]
                }
                let positionString = (i-2).toString().concat((j+2).toString())
                map2.set(board[i][j], positionString)
                board[i-2][j+2] = board[i][j]
                board[i][j] = null
            }
            if (move == 'BR'){
                moveMade[1] = "BR"
                if (board[i-1][j-1]){
                    map1.delete(board[i-1][j-1])
                    moveMade[2] = board[i-1][j-1]
                    board[i-1][j-1] = null
                }
                if (board[i-2][j-2]){
                    map1.delete(board[i-2][j-2])
                    moveMade[3] = board[i-2][j-2]
                }
                let positionString = (i-2).toString().concat((j-2).toString())
                map2.set(board[i][j], positionString)
                board[i-2][j-2] = board[i][j]
                board[i][j] = null
            }
        }
        return moveMade
    }
}