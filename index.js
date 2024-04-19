let header = document.querySelector("header");
let heading = document.querySelector("h1");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let turn = true;
let pattern1 = [],
  pattern2 = [];
let clickedBoxes = 0;
let winner = "";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const addResetMessage = () =>{
    const resetMessage = document.createElement("div");
    resetMessage.id = "reset-message";
    resetMessage.innerHTML = "<p>Please <b><i>RESET</i></b> to play again!</p>";
    header.append(resetMessage);
}

const removeResetMessage = () =>{
    const resetMessage = document.querySelector("#reset-message");
    if(resetMessage) resetMessage.remove();
}

const gameOn = (evt) => {
    clickedBoxes++;

    if (turn) {
      evt.target.querySelector("h1").innerHTML = "&#10060;"; // symbols: {sun, &#9788;}
      turn = !turn;

      checkWinner();
    } else {
      evt.target.querySelector("h1").innerHTML = "&#9989;"; // symbols: {rain: &#9928;} {O: &#11093;}
      turn = !turn;

      pattern2.push(evt.target.id);
      if (pattern2.length >= 3) {
        if (patternCheckInitializer(winPatterns, pattern2)) {
            winner = "&#9989;";
            gameOver(winner);
        }
      }
    }

    if(clickedBoxes === 9 && winner === "") gameOver("Draw");
  }

const gameOver = (gameWinner) =>{
    if(gameWinner === "Draw"){
        heading.innerHTML = gameWinner;
    } else{
        heading.innerHTML = `${gameWinner} Won!`;
        removeClickListener();
        addResetMessage();
    }
}

const checkWinner = () =>{
    for(winPattern of winPatterns){
        const pos0val = boxes[winPattern[0]].innerText;
        const pos1val = boxes[winPattern[1]].innerText;
        const pos2val = boxes[winPattern[2]].innerText;

        if(pos0val != "" && pos1val != "" && pos2val != ""){
            if(pos0val === pos1val && pos1val === pos2val){
                winner = pos0val;
                gameOver(winner);
            }
        }
    }
}

const resetValues = () =>{
  heading.innerHTML = "Tic-Tac-Toe";
  turn = true;
  pattern1 = [];
  pattern2 = [];
  clickedBoxes = 0;
  winner = "";
  
  removeResetMessage();

  for (let box of boxes) {
    box.querySelector("h1").innerHTML = "";
    box.addEventListener("click", gameOn);
  }
}

function patternCheckInitializer(winPatterns, pattern) {
  for (winPattern of winPatterns) {
    let patternCheck = patternChecker(winPattern, pattern);
    if (patternCheck) {
      return true;
    }
  }
  return false;
}

function patternChecker(winPattern, pattern) {
  for (item of winPattern) {
    let fi = pattern.findIndex((p) => p == item);
    if (fi === -1) return false;
  }
  return true;
}

function removeClickListener(){
    for(box of boxes){
        box.removeEventListener("click", gameOn);
    }
}

for (box of boxes) {
  box.addEventListener("mouseenter", (evt) => {
    evt.target.style.backgroundColor = "rgb(231, 236, 239, 0.6)";
  });

  box.addEventListener("mouseleave", (evt) => {
    evt.target.style.backgroundColor = "rgb(231, 236, 239, 1)";
  });

  box.addEventListener("click", gameOn);
}

resetBtn.addEventListener("click", resetValues);
