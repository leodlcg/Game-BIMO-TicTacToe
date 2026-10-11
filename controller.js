import {startGame, playRound, createPlayer, getPlayer01Name, getPlayer02Name, getPlayer01Win, getPlayer02Win, getPlayersRound, getStateGame, resetRound, finishGame, getArrayPositions} from "./gameBoard.js"

document.getElementById("btn_start").addEventListener("click", () => {

    document.getElementById("dialog-start").showModal();
    
})

document.getElementById("form-bth-back").addEventListener("click", () => {

    document.getElementById("dialog-start").close();
    
})

document.getElementById("form-create-players").addEventListener("submit", (event) => {

    event.preventDefault();
    document.getElementById("dialog-start").close();
    document.getElementById("home-content-game").style.display = "none";
    document.getElementById("content-game").style.display = "flex";
    createPlayer(document.getElementById("name-Player01").value.trim());
    createPlayer(document.getElementById("name-Player02").value.trim());
    document.getElementById("title-player01").textContent = getPlayer01Name();
    document.getElementById("title-player02").textContent = getPlayer02Name();
    document.getElementById("win-player01").textContent = `Win: ${getPlayer01Win()}`;
    document.getElementById("win-player02").textContent = `Win: ${getPlayer02Win()}`;
    startGame();

})

document.querySelectorAll(".btn-positon-game").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        btn.textContent = getPlayersRound() === 1 ? "X" : "O";
        btn.disabled = true;
        playRound(index + 1);
        checkGameBoard();

        if(getPlayersRound() === 1){
            document.getElementById("arm-left-game").style.animation = "move-arm-up 0.3s linear forwards";
            document.getElementById("arm-right-game").style.animation = "move-arm-down 0.3s linear forwards";
            document.getElementById("content-player01").style.transform = "scale(1.3)";
            document.getElementById("content-player02").style.transform = "scale(1)";
        }

        if(getPlayersRound() === 2){
            document.getElementById("arm-left-game").style.animation = "move-arm-down 0.3s linear forwards";
            document.getElementById("arm-right-game").style.animation = "move-arm-up 0.3s linear forwards";
            document.getElementById("content-player01").style.transform = "scale(1)";
            document.getElementById("content-player02").style.transform = "scale(1.3)";
        }

    });
});

async function checkGameBoard(){

    if(getStateGame() === "victory"){

        highlightPositions()
        await timeView(2000);
        clearGameBoard();
        console.log("vitoria")
        return

    }

    if(getStateGame() === "draw"){

        highlightPositions()
        await timeView(2000);
        clearGameBoard();
        console.log("empate")
        return

    }

    if(getStateGame() === "playing"){

        return

    }

}

function highlightPositions(){

    const positions = getArrayPositions();

    if(getStateGame() === "victory"){

        for(let i = 0; i < positions.length; i++){

            document.getElementsByClassName("btn-positon-game")[positions[i] - 1].style.backgroundColor = "green";

        }

    }

    if(getStateGame() === "draw"){

        for(let i = 0; i < document.getElementsByClassName("btn-positon-game").length; i++){

            document.getElementsByClassName("btn-positon-game")[i].style.backgroundColor = "darkslategrey";

        }
        
    }

}

function timeView(ms) {

  return new Promise((resolve) => setTimeout(resolve, ms));

}

function clearGameBoard(){

        document.querySelectorAll(".btn-positon-game").forEach(btn => {
            btn.textContent = "";
            btn.disabled = false;
            btn.style.backgroundColor = "#1f493b";
        });
        
        resetRound();
        document.getElementById("win-player01").textContent = `Win: ${getPlayer01Win()}`;
        document.getElementById("win-player02").textContent = `Win: ${getPlayer02Win()}`;
        return

}

document.getElementById("btn-reset-game").addEventListener("click", () => {

    clearGameBoard();
    
})

document.getElementById("btn-quit-game").addEventListener("click", () => {

    document.querySelectorAll(".btn-positon-game").forEach(btn => {
        btn.textContent = "";
        btn.disabled = false;
    });
    finishGame();
    document.getElementById("content-game").style.display = "none";
    document.getElementById("home-content-game").style.display = "flex";
    
})

const armLeft = document.getElementById("arm-left");
const armRight = document.getElementById("arm-right");
let leftDown = true;

const timer = setInterval(() => {
  if (leftDown) {
    armLeft.style.animation = "move-arm-down 0.3s linear forwards";
    armRight.style.animation = "move-arm-up 0.3s linear forwards";
  } else {
    armLeft.style.animation = "move-arm-up 0.3s linear forwards";
    armRight.style.animation = "move-arm-down 0.3s linear forwards";
  }
  leftDown = !leftDown;
}, 1000); // a cada 1 segundo