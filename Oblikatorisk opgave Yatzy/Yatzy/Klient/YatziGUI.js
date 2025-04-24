import {
    getValues, setValues, getThrowCount, throwDice, getResults, frequency,
    sameValuePoints, sameValue, onePairPoints, twoPairPoints,
    threeSamePoints, fourSamePoints, fullHousePoints, smallStraightPoints, largeStraightPoints,
    chancePoints, yatzyPoints, setThrowCount
} from "../Server/YatziLogik.js";

document.querySelector("button").addEventListener("click", function () {
    var audio = document.getElementById("musik");
    audio.play();
});

// Lydeffekt på knappen
document.querySelector("button").addEventListener("click", function () {
    var audio = document.getElementById("myAudio");
    audio.play();
});

// Hent alle elementer med klassen "tegning"
var tegninger = document.querySelectorAll('.tegning');

// Tilføj en event listener til hvert element
tegninger.forEach(function (tegning) {
    tegning.addEventListener('mouseover', function () {
        // Ændr størrelsen på elementet, når musen holder over det
        tegning.style.transform = 'scale(1.9)';
    });

    tegning.addEventListener('mouseout', function () {
        // Gendan størrelsen på elementet, når musen fjernes
        tegning.style.transform = 'scale(1)';
    });
});

let knap = document.querySelector("button")
// let input = document.querySelector("#throwCounter")
let holdStatus = [false, false, false, false, false]
// let clickAbleInputs = document.querySelectorAll('.input')

let clickableInputs = document.querySelectorAll('.input');
let clickableSpecialInput = document.querySelectorAll('.inputSpecial')
let chosenInputField = true;
let sumSameValues = document.querySelector("#samesAfSamesInput")
let sumSameSpecialValues = document.querySelector('#specialInputSum')
let bonusSameValues = document.querySelector('#sumBonusInput')
let clickAbleDices = document.querySelectorAll('.item')
let sumTotal = document.querySelector('#specialInputTotal')
let countInputsHeld = 0;


knap.onclick = throwDiceGUI

//Logikken for tegningen kastet.
function throwDiceGUI() {
    throwDice(holdStatus)
    let terningsArea = document.querySelector("#terningArea")
    //fjerner eksisterende terningbilleder
    // input.value = getThrowCount()

    for (let i = 0; i < getValues().length; i++) {
        if (!holdStatus[i]) {
            let img = document.querySelector("#terning" + (i + 1))
            img.src = getFaceValue(getValues()[i])
        }
    }

    chosenInputField = true;
    setValuesInput()
    setSpecialValuesInput()

    console.log(getThrowCount())
    if ((getThrowCount() % 3) == 0) {
        console.log(getThrowCount())
        sumTotal.value = (parseInt(sumSameValues.value) + parseInt(sumSameSpecialValues.value)) + (parseInt(bonusSameValues.value))
        alert("Tre kast er kastet! Vælg et felt")
        knap.disabled = true
    }
}

//Logikken for at der sættes en ny runde efter et tilgængelig felt er valgt
function newRound(){
    knap.disabled = false
    setThrowCount(0)
    for (let i = 0; i < 5; i++){ 
    if(clickAbleDices[i].classList.contains('held')){
        handleClick(i)
    }
    sumTotal.value = (parseInt(sumSameValues.value) + parseInt(sumSameSpecialValues.value)) + (parseInt(bonusSameValues.value))
    resetDice()

}
}

//Logik for at alle tegninger bliver nulstillet efter endt runde.
function resetDice(){
    for (let i = 0; i < holdStatus.length; i++){ 
    let img = document.querySelector("#terning" + (i + 1))
    img.src = getFaceValueBlank()
    }
}

function getFaceValueBlank(){
    return 'Kugle blank.png'
}

//Sætter værdien på sames value felterne
function setValuesInput() {
    clickableInputs.forEach(input => {
        if (input.id == "samesInput1") {
            if (input.disabled == false) {
                input.value = getResults()[0].toString()
            }
        } else if (input.id == "samesInput2") {
            if (input.disabled == false) {
                input.value = getResults()[1].toString()
            }
        }
        else if (input.id == "samesInput3") {
            if (input.disabled == false) {
                input.value = getResults()[2].toString()
            }

        } else if (input.id == "samesInput4") {
            if (input.disabled == false) {
                input.value = getResults()[3].toString()
            }

        } else if (input.id == "samesInput5") {
            if (input.disabled == false) {
                input.value = getResults()[4].toString()
            }

        } else if (input.id == "samesInput6") {
            if (input.disabled == false) {
                input.value = getResults()[5].toString()
            }
        }
    })
}

//Sætter værdien på special value felterne.
function setSpecialValuesInput() {
    clickableSpecialInput.forEach(input => {
        if (input.id == "specialInput1") {
            if (input.disabled == false) {
            input.value = getResults()[6];}

        } else if (input.id == "specialInput2") {
            if (input.disabled == false) {
                input.value = getResults()[7];
            }

        } else if (input.id == "specialInput3") {
            if (input.disabled == false) {
                input.value = getResults()[8];
            }

        } else if (input.id == "specialInput4") {
            if (input.disabled == false) {
                input.value = getResults()[9];
            }

        } else if (input.id == "specialInput5") {
            if (input.disabled == false) {
                input.value = getResults()[10];
            }

        } else if (input.id == "specialInput6") {
            if (input.disabled == false) {
                input.value = getResults()[11];
            }

        } else if (input.id == "specialInput7") {
            if (input.disabled == false) {
                input.value = getResults()[12];
            }

        } else if (input.id == "specialInput8") {
            if (input.disabled == false) {
                input.value = getResults()[13];
            }

        } else if (input.id == "specialInput9") {
            if (input.disabled == false) {
                input.value = getResults()[14];
            }
        }
    });
}

//Logikken for hvilket billede tegningen har
function getFaceValue(value) {
    if (value == 1) {
        return 'Kugle 1 50_50.png'
    } else if (value == 2) {
        console.log("terning2.PNG")
        return 'Kugle 2 50_50.png'
    } else if (value == 3) {
        console.log("terning3.PNG")
        return 'Kugle 3 50_50.png'
    } else if (value == 4) {
        console.log("terning3.PNG")
        return 'Kugle 4 50_50.png'
    } else if (value == 5) {
        console.log("terning3.PNG")
        return 'Kugle 5 50_50.png'
    } else if (value == 6) {
        console.log("terning3.PNG")
        return 'Kugle 6 50_50.png'
    }
}

//Ændre værdien på same value felterne.
function getResultSameValue(id) {
    let value = 0
    if (id == "samesInput1") {
        value = getResults()[0]
    } else if (id == "samesInput2") {

        value = getResults()[1]
    }
    else if (id == "samesInput3") {
        value = getResults()[2]

    } else if (id == "samesInput4") {
        value = getResults()[3]


    } else if (id == "samesInput5") {
        value = getResults()[4]


    } else if (id == "samesInput6") {
        value = getResults()[5]
    }
    return value;
}

//Ændre værdien på special value felterne.
function getResultSpecialValue(id) {
    let value = 0
    if (id == "specialInput1") {
        value = getResults()[6]

    } else if (id == "specialInput2") {
        value = getResults()[7]

    } else if (id == "specialInput3") {
        value = getResults()[8]

    } else if (id == "specialInput4") {
        value = getResults()[9]

    } else if (id == "specialInput5") {
        value = getResults()[10]

    } else if (id == "specialInput6") {
        value = getResults()[11]

    } else if (id == "specialInput7") {
        value = getResults()[12]

    } else if (id == "specialInput8") {
        value = getResults()[13]

    } else if (id == "specialInput9") {
        value = getResults()[14]
    }
    return value;
}

function handleClick(index) {
    // Ændr holdningsstatus for den valgte terning
    holdStatus[index] = !holdStatus[index];
    // Tilføj eller fjern CSS-klasse for at angive, at terningen er holdt fast
    if (holdStatus[index]) {
        clickAbleDices[index].classList.add('held');
    } else {
        clickAbleDices[index].classList.remove('held');
    }
}

clickAbleDices.forEach((dice, index) => {
    dice.addEventListener('click', () => handleClick(index));
});

//Logik for hvornår spillet er slut. Bruger countInputHeld der tæller op, hver gang et felt bliver valgt.
function erSpilletSlut() {
    if (countInputsHeld == clickableInputs.length + clickableSpecialInput.length) {
        sumTotal.value = (parseInt(sumSameValues.value) + parseInt(sumSameSpecialValues.value)) + (parseInt(bonusSameValues.value))
        alert("Spillet er slut. Din final score er: (" + sumTotal.value + ") refresh siden for nyt spil")
    }
}

//Logik for same value felterne når der vælges et felt
clickableInputs.forEach(input => {
    input.addEventListener('click', function () {
        if (input.classList.contains('held')) {
            let inputHolder = input.value;
            input.classList.remove('held');
            input.value = inputHolder;
        } else {
            if (chosenInputField) {
                let valueHeld = input.value;
                let bonus = 0
                let sum = parseInt(sumSameValues.value);
                input.classList.add('held');
                input.disabled = true;
                chosenInputField = false;
                sum += getResultSameValue(input.id);
                if (sum >= 63) {
                    bonus = 50
                    bonusSameValues.value = bonus.toString()
                }
                console.log("Dette er sum " + sum)
                sumSameValues.value = sum.toString();
                countInputsHeld++;
                erSpilletSlut()
            }
        }
        newRound()
    });
});

//Logik for special value felterne når der vælges et felt
clickableSpecialInput.forEach(input => {
    input.addEventListener('click', function () {
        if (input.classList.contains('held')) {
            let inputHolder = input.value;
            input.classList.remove('held');
            input.value = inputHolder;
        } else {
            if (chosenInputField) {
                let valueHeld = input.value;
                let bonus = 0
                let sum = parseInt(sumSameSpecialValues.value);
                input.classList.add('held');
                input.disabled = true;
                chosenInputField = false;

                sum += getResultSpecialValue(input.id);
                sumSameSpecialValues.value = sum.toString();
                countInputsHeld++;
                erSpilletSlut()
            }
        }
        newRound()
    });
});
