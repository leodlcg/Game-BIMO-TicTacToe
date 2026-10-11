import { Player } from "./Player.js"

let gameBoard = [ //Positions 1 - 9 [0][0] = 1, [0][1] = 2, ...
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
];

let players = [];

let playersRound = 0; //1 = player1 && 2 = player2

let totalRounds = 0;

let stateGame = "playing" //draw, victory or playing

let arrayPositions = [];

export function createPlayer(name){

    if(players.length  === 2) return null;

    const player = Player(name);
    players.push(player);

}

function tradePlayer(){

    if(playersRound === 0){ playersRound = 1; return}

    if(playersRound === 1){ playersRound = 2; return}

    if(playersRound === 2){playersRound = 1; return}

}

export function playRound(position){

    switch(position){

        case 1:
            gameBoard[0][0] = playersRound;
            break;
        case 2:
            gameBoard[0][1] = playersRound;
            break;
        case 3:
            gameBoard[0][2] = playersRound;
            break;
        case 4:
            gameBoard[1][0] = playersRound;
            break;
        case 5:
            gameBoard[1][1] = playersRound;
            break;
        case 6:
            gameBoard[1][2] = playersRound;
            break;
        case 7:
            gameBoard[2][0] = playersRound;
            break;
        case 8:
            gameBoard[2][1] = playersRound;
            break;
        case 9:
            gameBoard[2][2] = playersRound;
            break;
    }


    if(checkDraw()){

        finishRound();
        console.log("Empatou")
        return;

    }
    
    if(checkWinRound()){

        finishRound("Win");
        console.log("Ganhou")
        return;

    }else{

        tradePlayer();

    }

}

function checkDraw(){

    let draw = true;

    for (const row of gameBoard) {
        for (const i of row) {
            if (i === 0) {

                draw = false;
                break;
                
            }
        }
        if(draw === false){break;}
    }

    return draw;

}

function checkWinRound(){

    let check = false;

    if(checkWinRow() || checkWinColumn() || checkWinDiagonal()){

        check = true;

    }

    return check;

}

function checkWinRow(){

    let check = [];
    let coords = [];
    let win = false;

    for(let i = 0; i <= 2; i++){

        for(let j = 0; j <= 2; j++){

            check[j] = gameBoard[i][j];
            coords[j] = [i, j];

        }

        if(checkWin(check)){

            win = true;
            arrayPositions = getPositions(coords);
            break;

        }

    }

    return win;

}

function checkWinColumn(){

    let check = [];
    let coords = [];
    let win = false;

    for(let i = 0; i <= 2; i++){

        for(let j = 0; j <= 2; j++){

            check[j] = gameBoard[j][i];
            coords[j] = [j, i];

        }

        if(checkWin(check)){

            win = true;
            arrayPositions = getPositions(coords);
            break;

        }

    }

    return win;

}

function checkWinDiagonal(){

    let check = [];
    let win = false;

    check = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];

    if(checkWin(check)){

        win = true;
        arrayPositions = getPositions([[0, 0], [1, 1], [2, 2]]);
        return win;

    }

    check = [gameBoard[2][0], gameBoard[1][1], gameBoard[0][2]];

    if(checkWin(check)){

        win = true;
        arrayPositions = getPositions([[2, 0], [1, 1], [0, 2]]);
        return win;

    }

    return win;

}

function checkWin(check){

    let checkVictory = false;

    if((check[0] * check[1] * check[2]) === 1 || check[0] * check[1] * check[2] === 8){
    
        checkVictory = true;

    }

    return checkVictory;

}

export function startGame(){

    playersRound = 1;
    totalRounds++;

}

export function resetRound(){

    stateGame = "playing" //draw, victory or playing
    totalRounds++;
    playersRound = 1;
    console.log("ResetRound")

}

function finishRound(type){

    if(type === "Win"){

        players[playersRound - 1].addWin();
        stateGame = "victory" //draw, victory or playing
        resetGameBoard();
        return;


    }

    stateGame = "draw" //draw, victory or playing
    resetGameBoard();
    return;

}

function resetGameBoard(){

    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            gameBoard[i][j] = 0;
        }
    }

}

export function finishGame(){

    players = [];
    resetGameBoard();
    totalRounds = 0;
    playersRound = 0;
    stateGame = "playing" //draw, victory or playing

}

function getPositions(check) {
  const positions = [];

  for (let i = 0; i < check.length; i++) {
    const linha = check[i][0];
    const coluna = check[i][1];

    positions.push(linha * 3 + coluna + 1);
  }

  return positions;
}

export function getPlayer01Name(){return players[0].getName();}

export function getPlayer02Name(){return players[1].getName();}

export function getPlayer01Win(){return players[0].getWin();}

export function getPlayer02Win(){return players[1].getWin();}

export function getPlayersRound(){return playersRound;}

export function getStateGame(){return stateGame;} //draw, victory or playing

export function getArrayPositions(){return arrayPositions;}
