var min = 0,
    max = 100,
    sequenceLength = 5;
var numberSection = document.getElementById("number-area");
var sequenceSection = document.getElementById("sequence-area");
let activeDestination, activeSource;
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
            number.ondragover = allowDrop;
            number.ondrop = drop;
            element = '';
            number.onclick = setActiveDestination;
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

        number.onclick = setActiveSource;
        number.classList.add("number");
        number.classList.add("missing");
        number.innerText = element;
        number.draggable = true;
        number.ondragstart = drag;

        numberSection.appendChild(number);

    }


}



startGame();

function randomIntFromInterval(min, max) { // min and max included 
    var no = Math.floor(Math.random() * (max - min + 1) + min);
    return no;
}

function setActiveDestination(e) {
    if (activeDestination) {
        activeDestination.classList.toggle("active");
    }

    activeDestination = e.target;

    activeDestination.classList.toggle("active");
}

function setActiveSource(e) {
    if (activeDestination) {
        if (activeSource) {
            activeSource.classList.toggle("active");
        }
        activeSource = e.target;
        activeSource.classList.toggle("active");
        if (activeDestination && activeDestination.dataset.answer == activeSource.innerText) {
            activeDestination.innerText = activeSource.innerText;
            missingNumbers.splice(missingNumbers.indexOf(activeSource.innerText));
            activeSource.innerText = '';
            setTimeout(() => {
                activeDestination.classList.toggle("correct");
                activeSource.classList.toggle("disapear");
                activeDestination.onclick = undefined;
                resetFields();
                checkForWin();
            }, 200);

        } else {
            activeDestination.innerText = activeSource.innerText;
            activeDestination.classList.toggle("wrong");
            setTimeout(() => {
                activeDestination.classList.toggle("wrong");
                activeDestination.innerText = '';
                resetFields();
            }, 1000);
        }

    }
}

function resetFields() {
    activeDestination.classList.toggle("active");
    activeSource.classList.toggle("active");
    activeDestination = null;
    activeSource = null;
}

function checkForWin() {
    if (missingNumbers.length === 0) {
        document.getElementById("you-won").classList.toggle("hide");

    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerText);
}

function allowDrop(ev) {
    ev.preventDefault();

}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.innerText = data;
}