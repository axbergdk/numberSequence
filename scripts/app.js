var min = 0,
    max = 100,
    sequenceLength = 5;
var numberSection = document.getElementById("number-area");
var sequenceSection = document.getElementById("sequence-area");

let missingNumbers;

function startGame() {
    missingNumbers = [];
    document.getElementById("you-won").classList.toggle("hide");
    numberSection.innerHTML = '';
    sequenceSection.innerHTML = '';
    activeDestination = null;
    activeSource = null;

    var start = randomIntFromInterval(min, max);
    var end = start + sequenceLength;

    var missing = [];
    var rand = randomIntFromInterval(2, 3);

    while (start <= end) {
        let element = start;
        var number = document.createElement("div");
        if (element % rand === 0) {
            missing.push(element);
            number.dataset.answer = element;
            number.ondrop = drop;
            number.ondragover = handleDragOver;
            number.ondragleave = handleDragLeave;
            element = '';
        }
        number.classList.add("number");
        number.innerText = element;

        sequenceSection.appendChild(number);
        start++;
    }



    while (missing.length > 0) {
        let element = missing[randomIntFromInterval(0, missing.length - 1)];
        missing.splice(missing.indexOf(element), 1);
        var number = document.createElement("div");
        missingNumbers.push(element);


        number.classList.add("number");
        number.classList.add("missing");
        number.innerText = element;
        number.draggable = true;
        number.ondragstart = drag;
        number.id = "missing" + element;

        numberSection.appendChild(number);

    }


}



startGame();

function randomIntFromInterval(min, max) { // min and max included 
    var no = Math.floor(Math.random() * (max - min + 1) + min);
    return no;
}

function checkForWin() {
    if (missingNumbers.length === 0) {
        document.getElementById("you-won").classList.toggle("hide");

    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerText);
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData(ev.target.innerText, "dummy")
}



function drop(ev) {

    console.log("drop")
    var data = ev.dataTransfer;
    if (data.types.indexOf(this.dataset.answer) === -1) {
        return false;
    } else {
        this.ondragover = undefined;
        this.ondrop = undefined;
        var number = data.getData("text");
        ev.target.innerText = number;
        document.getElementById(data.getData("id")).classList.toggle("disapear");
        missingNumbers.splice(missingNumbers.indexOf(parseInt(number)), 1);
        checkForWin();
    }

}

function handleDragOver(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer;
    var answer = this.dataset.answer;
    if (data.types.indexOf(answer) === -1) {
        this.classList.add('wrong');
    } else {
        this.classList.add("correct");
    }
}

function handleDragLeave(e) {
    this.classList.remove('wrong');
    this.classList.remove('correct');
}