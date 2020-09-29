var gridParent = document.getElementById("gridParent");
var elements = 6;

function createTile(number) {
    var card = document.getElementById("js-clone").cloneNode(true);
    card.id = "";
    card.querySelector("img").src = "images/Asset" + number + ".svg";
    var inner = card.querySelector(".flip-card-inner");
    inner.dataset.number = number;
    inner.onclick = function(el) {
        this.classList.add("flip")
    };
    console.log(inner);
    gridParent.appendChild(card);


}
startGame();

function startGame() {
    var tiles = createTileCollection();
    while (tiles.length > 0) {
        var index = randomIntFromInterval(0, tiles.length - 1);
        createTile(tiles[index]);
        tiles.splice(index, 1);
    }
}

function createTileCollection() {
    var list = [];
    let index = 0;
    while (index < elements * 2) {
        var no = randomIntFromIntervalNotInList(1, 23, list);
        list[index] = no;
        index++;
        list[index] = no;
        index++;
    }
    return list;
}


function randomIntFromInterval(min, max) { // min and max included 
    var no = Math.floor(Math.random() * (max - min + 1) + min);
    return no;
}

function randomIntFromIntervalNotInList(min, max, list) { // min and max included 
    var no = Math.floor(Math.random() * (max - min + 1) + min);
    if (list.includes(no)) {
        return randomIntFromInterval(min, max, list);
    }
    return no;
}