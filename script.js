let jogador = document.getElementById("player");
let playerX = true;
let tiles = document.getElementsByClassName("tile");
let setted=0;
let blocker = document.getElementById("blocker");
let winner = document.getElementById("winner");
let newgame = document.getElementById("newgame")


function namePlayer()
{
    return playerX?"X":"O";
}

function updatePlayer(){
    jogador.innerHTML = "Jogador: " + namePlayer();
}

function checkVitoria(status){
    if(status===null){
        winner.innerHTML = "Deu velha!"
        blocker.style.display = "flex";
    }
    else{
        if(status){
            winner.innerHTML = "Vencedor: " + namePlayer();
            blocker.style.display = "flex";
        }
    }
}

function atualStatus(){
    let tilesArray = [...tiles]
    let usedTiles = tilesArray.map(tile=>tile.playerX);

// verifica linhas
if(
    (
        usedTiles[0]!== undefined &&
        (
            usedTiles[0]===usedTiles[1] && usedTiles[1]===usedTiles[2] ||
            usedTiles[0]===usedTiles[3] && usedTiles[3]===usedTiles[6] ||
            usedTiles[0]===usedTiles[4] && usedTiles[4]===usedTiles[8]
        )
    ) ||

    (
        usedTiles[8]!== undefined &&
        (
            usedTiles[6]===usedTiles[7] && usedTiles[7]===usedTiles[8]||
            usedTiles[2]===usedTiles[5] && usedTiles[5]===usedTiles[8]
        )
    )

    ||

    (
        usedTiles[4]!== undefined &&
        (
            usedTiles[3]===usedTiles[4] && usedTiles[4]===usedTiles[5] ||
            usedTiles[1]===usedTiles[4] && usedTiles[4]===usedTiles[7] ||
            usedTiles[6]===usedTiles[4] && usedTiles[4]===usedTiles[2]
        )
    )
) {
        return true;
    }

    if(setted===9){
        return null;
    }
    return false;
}

const getColor = () =>playerX ? color = "blue" : color = "red";


function setTile(num){
    tiles[num].style.backgroundColor =getColor();
    tiles[num].onclick = ()=>false;
    tiles[num].playerX = playerX;
    tiles[num].innerHTML = namePlayer();
    setted++;
    console.log(setted)
    checkVitoria(atualStatus());
    playerX =! playerX;
    updatePlayer();
}

function resetTiles(){ 
    blocker.style.display = "none";
    setted=0;
    updatePlayer();   
    for (let i=0;i<9;i++){
        tiles[i].style.backgroundColor = "grey";
        tiles[i].onclick = ()=>setTile(i); 
        tiles[i].innerHTML = "";
        tiles[i].playerX = undefined;
    }
}


resetTiles();
newgame.onclick = resetTiles;

