var gridParent = document.getElementById("gridParent");
var elements = 6;
var correctSets = 0;
var tries = 0;
var winnerElm = document.getElementById("winner");
var cardsFlipped = [];

function createTile(number) {
    var card = document.getElementById("js-clone").cloneNode(true);
    card.id = "";
    card.querySelector("img").src = "images/Asset" + number + ".svg";
    var inner = card.querySelector(".flip-card-inner");
    inner.dataset.number = number;
    inner.onclick = flipCard;
    console.log(inner);
    gridParent.appendChild(card);


}
startGame();

function startGame() {
    winnerElm.style.display = "none";
    var tiles = createTileCollection();
    while (tiles.length > 0) {
        var index = randomIntFromInterval(0, tiles.length - 1);
        createTile(tiles[index]);
        tiles.splice(index, 1);
    }
}

function flipCard() {

    tries++;
    if (cardsFlipped.includes(this)) {
        console.log("Already flipped");
        return false;
    }
    this.classList.add("flip");
    cardsFlipped.push(this);
    if (cardsFlipped.length === 2) {
        if (cardsFlipped[0].dataset.number === cardsFlipped[1].dataset.number) {
            console.log("correct");
            cardsFlipped[0].onclick = null;
            cardsFlipped[1].onclick = null;
            cardsFlipped = [];
            correctSets++;

            if (correctSets === elements) {
                winnerElm.style.display = "block";
                setTimeout(() => {
                    location.reload();
                }, 5000);
            }

        } else {
            setTimeout(() => {
                cardsFlipped.forEach((elm) => {
                    elm.classList.remove("flip");
                    cardsFlipped = [];
                });
            }, 800);


        }

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