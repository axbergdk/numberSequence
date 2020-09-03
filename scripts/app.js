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

    while (start <= end) {
        let element = start;
        var number = document.createElement("div");
        if (element % 2 === 0) {
            missing.push(element);
            number.dataset.answer = element;
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