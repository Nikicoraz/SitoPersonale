let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]

let turn = 0;

const PLAYER1 = "X";
const PLAYER2 = "O";

let end = false;

for(let i = 1; i <= 9; i++){
    let div = document.getElementById(i);
    div.addEventListener("click", (e) =>{
        if(board[(div.id - 1) % 3][Math.floor((div.id - 1) / 3)] || end)
            return
        const PLAYER = turn % 2 == 0 ? PLAYER1 : PLAYER2;
        board[(div.id - 1) % 3][Math.floor((div.id - 1) / 3)] = PLAYER;
        div.innerText = PLAYER;
        turn++;
        checkStatus();
    });
}

function checkStatus(){
    if (
        // Orizzontale
        (board[0][0] == board[0][1] && board[0][0] != "") && board[0][1] == board[0][2] ||
        (board[1][0] == board[1][1] && board[1][0] != "") && board[1][1] == board[1][2] ||
        (board[2][0] == board[2][1] && board[2][0] != "") && board[2][1] == board[2][2] ||
        // Verticale
        (board[0][0] == board[1][0] && board[0][0] != "") && board[1][0] == board[2][0] ||
        (board[0][1] == board[1][1] && board[0][1] != "") && board[1][1] == board[2][1] ||
        (board[0][2] == board[1][2] && board[0][2] != "") && board[1][2] == board[2][2] ||
        // Obliquo
        (board[0][0] == board[1][1] && board[0][0] != "") && board[1][1] == board[2][2] ||
        (board[0][2] == board[1][1] && board[0][2] != "") && board[1][1] == board[2][0] 
        ){
            end = true;
            const p = document.createElement("p");
            p.innerText = "THE WINNER IS " + (turn % 2 == 0 ? PLAYER2 : PLAYER1);
            p.style.fontWeight = "bold";
            p.style.fontSize = "50px";
            document.getElementById("game").appendChild(p);
        }
}