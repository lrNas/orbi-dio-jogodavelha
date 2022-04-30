let blocker = document.getElementById("blocker");
let jogador = document.getElementById("player");
let tiles = document.getElementsByClassName("tile");
let winner = document.getElementById("winner");
let newgame = document.getElementById("newgame")
let playerX = true;
let setted = 0;
const namePlayer = _ => playerX ? "X" : "O";
const updatePlayer = _ => jogador.innerHTML = "Jogador: " + namePlayer();
const getColor = _ => playerX ? color = "blue" : color = "red";
const onFocus = event => event.target.style.backgroundColor = getColor();
const onBlur = event => event.target.style.backgroundColor = "";

function checkVitoria(status) {
    if (status === null) {
        winner.innerHTML = "Deu velha!"
        blocker.style.display = "flex";
    }
    else {
        if (status) {
            winner.innerHTML = "Vencedor: " + namePlayer();
            blocker.style.display = "flex";
        }
    }
}

function atualStatus() {
    let tilesArray = [...tiles]
    let usedTiles = tilesArray.map(tile => tile.playerX);

    if (
        (
            usedTiles[0] !== undefined &&
            (
                usedTiles[0] === usedTiles[1] && usedTiles[1] === usedTiles[2] ||
                usedTiles[0] === usedTiles[3] && usedTiles[3] === usedTiles[6] ||
                usedTiles[0] === usedTiles[4] && usedTiles[4] === usedTiles[8]
            )
        )
        ||

        (
            usedTiles[8] !== undefined &&
            (
                usedTiles[6] === usedTiles[7] && usedTiles[7] === usedTiles[8] ||
                usedTiles[2] === usedTiles[5] && usedTiles[5] === usedTiles[8]
            )
        )

        ||

        (
            usedTiles[4] !== undefined &&
            (
                usedTiles[3] === usedTiles[4] && usedTiles[4] === usedTiles[5] ||
                usedTiles[1] === usedTiles[4] && usedTiles[4] === usedTiles[7] ||
                usedTiles[6] === usedTiles[4] && usedTiles[4] === usedTiles[2]
            )
        )
    ) {
        return true;
    }

    if (setted === 9) {
        return null;
    }
    return false;
}

function setTile(num) {
    tiles[num].removeEventListener("mouseleave", onBlur, false);
    tiles[num].removeEventListener("mouseover", onFocus, false);
    tiles[num].onclick = () => false;
    tiles[num].playerX = playerX;
    tiles[num].style.backgroundColor = getColor();
    tiles[num].innerHTML = namePlayer();
    setted++;
    checkVitoria(atualStatus());
    playerX = !playerX;
    updatePlayer();
}

function resetTiles() {
    blocker.style.display = "none";
    setted = 0;
    updatePlayer();
    for (let i = 0; i < 9; i++) {
        tiles[i].style.backgroundColor = "grey";
        tiles[i].onclick = () => setTile(i);
        tiles[i].innerHTML = "";
        tiles[i].playerX = undefined;
        tiles[i].addEventListener("mouseover", onFocus
            , false);
        tiles[i].addEventListener("mouseleave", onBlur
            , false);
    }
}

resetTiles();
newgame.onclick = resetTiles;