export class Board {

    // Creates a empty board of 5x5
    board(){
        this.state = []
        for (let i=0; i<5;i++){
            let arr = []
            for (let i=0; i<5;i++){
                arr.push(null)
            }
            this.state.push(arr)
        }
        return this.state
    }

// player 1 --> blue(b)
// player 2 --> red(r)
// fills the board with characters recieved from the players and also maintains a map with the position of the characters
    position(order, player){
        let map = new Map()
        for (let i=0; i<order.length;i++){
            if (player == 1){
                this.state[4][i] = order[i].concat('b')
                let positionString = '4'.concat(i.toString())
                map.set(this.state[4][i], positionString)
            }
            else{
                this.state[0][i] = order.reverse()[i].concat('r')
                let positionString = '0'.concat(i.toString())
                map.set(this.state[0][i], positionString)
            }
        }
        return map
    }
}