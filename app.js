//Upper Price 15
//https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15
//All Deals
//https://www.cheapshark.com/api/1.0/deals?

window.onload = async function(){
    timer();
    gameList = await createList()
    searchQuestioning(gameList)
    //Search bar
    let active = false
    var searchBtn = document.getElementById("searchBtn")
    searchBar = document.getElementById("search")
    searchBar.style.display = "none"
    searchBtn.addEventListener("click",function(){
        document.getElementById("search").classList.toggle("active");
        if (active == false){
            loadSearch()
            active = true
        } else {
            unloadSearch()
            active = false
        }
    });
}

async function getGame() {
    let url ="https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
    let res = await fetch(url);
    let game = await res.json();
    return game
    
}

function getInfo(game) {
    let gameName = game["title"];
    let gameIcon = game["thumb"];
    let gameOld = "£" + game["normalPrice"].toString() ;
    let gameNew = "£" + game["salePrice"].toString();
    let gameSalePer = Math.floor(game["savings"]).toString() + "%";
    return [gameName,gameIcon,gameOld,gameNew,gameSalePer]
}

function timer(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    document.getElementById("date").innerText = day + "/" + month + "/" + year;
    let hour = date.getHours().toString();
    if (hour.length == 1){
        hour = "0" + hour
    }
    let minutes = date.getMinutes().toString();
    if (minutes.length == 1){
        minutes = "0" + minutes;
    }
    document.getElementById("time").innerText = hour + ":" + minutes;
    setInterval(() => {
        date = new Date();
        hour = date.getHours().toString();
        if (hour.length == 1){
            hour = "0" + hour
        }
        minutes = date.getMinutes().toString();
        if (minutes.length == 1){
            minutes = "0" + minutes
        }
        document.getElementById("time").innerText = hour + ":" + minutes;
    },1000)

}
async function createList(){
    let game = await getGame()
    let gameLength = game.length;
    gameList = []
    for (var i = 1; i <= gameLength-1; i++){
        let current = game[i];
        gameInfo = getInfo(current);
        let container = document.createElement("div");
        container.id = "container";
        a = document.createElement("div");
        document.getElementById("itemList").append(a);
        a.classList.add("Container");
        gameName = document.createElement("div");
        gameName.innerText = gameInfo[0];
        gameName.id = "gameName";
        gameThumb = document.createElement("img");
        gameThumb.id = "gameImg";
        gameThumb.src = gameInfo[1];
        gameOld = document.createElement("div");
        gameOld.id = "oldPrice";
        gameOld.innerText = gameInfo[2];
        gameNew = document.createElement("div");
        gameNew.id = "newPrice";
        gameNew.innerText = gameInfo[3];
        SalePer = document.createElement("div");
        SalePer.id = "savings"
        SalePer.innerText = gameInfo[4]
        a.id = (gameInfo[0])
        a.append(gameThumb,gameName,gameNew,gameOld,SalePer)
        gameList.push(gameInfo[0])
    }
    return gameList
}

function loadSearch() {
    active = true
    searchBar.style.display = "block"
    searchBar.style.width = "100px"
    searchBar.style.backgroundColor = "wheat"
    searchBar.style.border = "1px solid black"
    }
function unloadSearch() {
    active = false
    searchBar.style.display = "none"
}

function searchQuestioning(gameList){
    const InputBar = document.getElementById("search")
    InputBar.addEventListener("input", () => {
        searchGames(InputBar.value,gameList)
    })
}


function searchGames(input,gameList) {
    for(var i = 0; i<=gameList.length-1; i++){
        gameContainer = document.getElementById(gameList[i])
        if ((gameList[i].toLowerCase()).includes(input.toLowerCase())){ 
            gameContainer.style.display = "flex";
        }else {
            gameContainer.style.display = "none"
        }
    }
}