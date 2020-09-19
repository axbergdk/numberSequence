var gameMode = "";
var min = 0,
    max = 100,
    sequenceLength = 5;
var numberSection = document.getElementById("number-area");
var sequenceSection = document.getElementById("sequence-area");

let missingNumbers;

function startSequenceGame(sequence) {

    resetGameObjects();

    var missing = [];
    var rand = randomIntFromInterval(2, 3);

    for (var i = 0; i < sequence.length; i++) {
        let element = sequence[i];

        if (element % rand === 0) {
            missing.push(element);
        }

        var number = createNumberElement(element, false, element % rand === 0);
        sequenceSection.appendChild(number);
    }

    while (missing.length > 0) {
        let element = missing[randomIntFromInterval(0, missing.length - 1)];
        missing.splice(missing.indexOf(element), 1);
        var number = createNumberElement(element, true, false);
        missingNumbers.push(element);
        numberSection.appendChild(number);
    }
}

function startGame() {
    if (gameMode === 'advanced') {
        startAdvancedSequence();
    }
    if (gameMode === 'simple') {
        startSimpleSequence();
    }
}

function startSimpleSequence() {
    var start = randomIntFromInterval(min, max);
    var end = start + sequenceLength;
    var sequence = [];
    while (start < end) {
        sequence.push(start);
        start++;
    }
    startSequenceGame(sequence);
}

function startAdvancedSequence() {
    var sequence = [];

    for (var i = 0; i < sequenceLength; i++) {
        sequence.push(randomIntFromInterval(min, max));
    }
    startSequenceGame(sequence.sort((a, b) => { return a - b }));

}

function createNumberElement(number, isMissingNumber, isPlaceholder) {
    var element = document.createElement("div");
    if (isPlaceholder) {
        element.dataset.answer = number;
        element.ondrop = drop;

        element.ondragover = handleDragOver;
        element.ondragleave = handleDragLeave;
        number = '';
    }
    if (isMissingNumber) {
        element.classList.add("missing");
        element.draggable = true;
        element.ondragstart = drag;
        element.id = "missing" + element;
    }

    element.classList.add("number");
    element.innerText = number;
    return element;
}

function resetGameObjects() {
    missingNumbers = [];
    document.getElementById("you-won").classList.add("hide");
    numberSection.innerHTML = '';
    sequenceSection.innerHTML = '';
    activeDestination = null;
    activeSource = null;
}

function start() {
    if (document.getElementById("advanced").checked || document.getElementById("simple").checked) {
        gameMode = document.getElementById("advanced").checked ? 'advanced' : 'simple';
        document.getElementById("chooseGame").classList.add("hide");
        startGame();

    }
}

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