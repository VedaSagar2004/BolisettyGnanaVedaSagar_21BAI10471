export class Validation {

    //   *  *  *  *  *   -> player 2 - red(r)
    //   *  *  *  *  *
    //   *  *  *  *  *
    //   *  *  *  *  *
    //   *  *  *  *  *   -> player 1 - blue(b)

    // we take player 1 as the bottom and player 2 as top from the dev perspective for the user we flip the board on the frontend


    // if we recieve the input of player as 1 then we check the characters ending with b else ending with r
    // we need the player input to check for the friendly fire
    // we also take the position of the selected piece as input
    // this method returns a boolean as output
    
    // checks if the pawn move is not out of bounds and not friendly fire
    pawn(move, i, j, player, board){
        if (player == 1){
            if (move == "F"){
                if (i-1 >= 0){
                    if (board[i-1][j] && board[i-1][j][2] == 'b'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "L" ){
                if (j-1 >= 0){
                    if (board[i][j-1] && board[i][j-1][2] == 'b'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "R"){
                if (j+1 <= 4){
                    if (board[i][j+1] && board[i][j+1][2] == 'b'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "B"){
                if (i+1 <= 4){
                    if ( board[i+1][j] && board[i+1][j][2] == 'b'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
        }
        else {
            if (move == "F"){
                if (i+1 <= 4){
                    if (board[i+1][j] && board[i+1][j][2] == 'r'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "R"){
                if (j-1 >= 0){
                    if (board[i][j-1] && board[i][j-1][2] == 'r'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "L"){
                if (j+1 <= 4){
                    if (board[i][j+1] && board[i][j+1][2] == 'r'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "B"){
                if (i-1 >= 0){
                    if (board[i-1][j] && board[i-1][j][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
        }
        
    }

    // checks if the hero1 move is not out of bounds and not friendly fire
    hero1(move, i, j, player, board){
        if (player == 1){
            if (move == "F"){
                if (i-2 >= 0){
                    if (board[i-2][j] && board[i-2][j][2] == 'b'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "L"){
                if (j-2 >= 0){
                    if (board[i][j-2] && board[i][j-2][2] == 'b'){
                        return false
                    }
                    else {
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "R"){
                if (j+2 <= 4){
                    if (board[i][j+2] && board[i][j+2][2] == 'b'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "B"){
                if (i+2 <= 4){
                    if (board[i+2][j] && board[i+2][j][2] == 'b'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
        }
        else {
            if (move == "F"){
                if (i+2 <= 4){
                    if (board[i+2][j] && board[i+2][j][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "R"){
                if (j-2 >= 0){
                    if (board[i][j-2] && board[i][j-2][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "L"){
                if (j+2 <= 4){
                    if (board[i][j+2] && board[i][j+2][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "B"){
                if (i-2 >= 0){
                    if (board[i-2][j] && board[i-2][j][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
        }
        
    }

    // checks if the hero2 move is not out of bounds and not friendly fire
    hero2(move, i, j, player, board){
        if (player == 1){
            if (move == "FR"){
                if (i-2 >= 0 && j+2 <= 4){
                    if (board[i-2][j+2] && board[i-2][j+2][2] == 'b'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "FL"){
                if (i-2 >= 0 && j-2 >= 0){
                    if (board[i-2][j-2] && board[i-2][j-2][2] == 'b'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "BR"){
                if (i+2 <= 4 && j+2 <= 4){
                    if (board[i+2][j+2] && board[i+2][j+2][2] == 'b'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "BL"){
                if (i+2 <= 4 && j-2 >= 0){
                    if (board[i+2][j-2] && board[i+2][j-2][2] == 'b'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
        }
        else{
            if (move == "FR"){
                if (i+2 <= 4 && j-2 >= 0){
                    if (board[i+2][j-2] && board[i+2][j-2][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "FL"){
                if (i+2 <= 4 && j+2 <= 4){
                    if (board[i+2][j+2] && board[i+2][j+2][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "BR"){
                if (i-2 >= 0 && j-2 >= 0){
                    if (board[i-2][j-2] && board[i-2][j-2][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
            if (move == "BL"){
                if (i-2 >= 0 && j+2 <= 4){
                    if (board[i-2][j+2] && board[i-2][j+2][2] == 'r'){
                        return false
                    }
                    else{
                        return true
                    }
                }
                else{
                    return false
                }
            }
        }
    }
}