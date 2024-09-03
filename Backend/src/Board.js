export class Board {

    // Creates a empty board of 5x5
    newBoard(){
        let newBoardArr = []
        for (let i=0; i<5;i++){
            let arr = []
            for (let i=0; i<5;i++){
                arr.push(null)
            }
            newBoardArr.push(arr)
        }
        return newBoardArr
    }

// player 1 --> blue(b)
// player 2 --> red(r)
// fills the board with characters recieved from the players and also maintains a map with the position of the characters
    position(order, player, board){
        let map = new Map()
        if (player == 1){
            for (let i=0; i<order.length;i++){
                board[4][i] = order[i].concat('b')
                let positionString = '4'.concat(i.toString())
                map.set(board[4][i], positionString)
            }
        } else{
            order.reverse()
            for (let i=0; i<order.length;i++){
                board[0][i] = order[i].concat('a')
                let positionString = '0'.concat(i.toString())
                map.set(board[0][i], positionString)
            }
        }
        return map
    }
}