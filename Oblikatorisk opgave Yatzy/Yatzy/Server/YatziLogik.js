

let values = [0,0,0,0,0];
let throwCount = 0;



function getValues() {
    return values
    
}
function setValues(values1){
    values = values1;
}

function getThrowCount(){ 
    return throwCount;
}

function throwDice(holdStatus) {
    let newValues = []; // Kopierer arrayet values
    
    for(let j = 0; j < values.length; j++){
        newValues[j] = values[j];
    }

    for (let i = 0; i < newValues.length; i++) {
        // Hvis terningen skal holdes, spring kastet over
        if (holdStatus[i]) {
            continue;
        }
        newValues[i] = Math.floor(Math.random() * 6) + 1; // Genererer et tilfældigt tal mellem 1 og 6
    }

    setValues(newValues); // Opdaterer terningværdierne
    throwCount++; // Tæller antallet af kast op
}





function getResults(){
    let results = []
    for (let i = 0; i <= 5; i++) {
        results[i] = sameValuePoints(i + 1);
    }
    results[6] = onePairPoints();
    results[7] = twoPairPoints();
    results[8] = threeSamePoints();
    results[9] = fourSamePoints();
    results[10] = fullHousePoints();
    results[11] = smallStraightPoints();
    results[12] = largeStraightPoints();
    results[13] = chancePoints();
    results[14] = yatzyPoints();

    return results;
}


function frequency() {
    let counter = []; // Initialiserer et array med længde 7 og fylder det med 0'er
    for (let i = 0; i < values.length; i++) {
        counter[values[i]]++;
    }
    return counter;
}

function sameValuePoints(value){
    let sum = 0;
    // checking if index i is the same as the paramenter value, then it will at the number to sum
    for (let i = 0; i < values.length; i++) {
        if (values[i] == value) {
            sum += values[i];
        }
    }
    return sum;
}

function sameValue(value){
    let count = 0;

    for (let i = 0; i < values.length; i++) {
        if (values[i] == value) {
            count++;
        }
    }

    return count;
}


function onePairPoints(){

    let highestValue = 0;
    let secondHighestValue = 0;
    let pairs = false;
    let counter = Array(7).fill(0); // Initialisering af counter-arrayet

    for (let i = 0; i < values.length; i++) {
        counter[values[i]]++; // Inkrementering af tællingerne for terningværdierne
    }

    console.log("Counter array:", counter);

    for (let i = 1; i < counter.length; i++) { // Start fra 1, da terningværdierne starter fra 1
        if (counter[i] >= 2 && !pairs){
            highestValue = i * 2;
            pairs = true;
            console.log("Found first pair. Highest value:", highestValue);
        }
        if (counter[i] >= 2 && pairs){
            secondHighestValue = i * 2;
            if (secondHighestValue > highestValue){
                let container = highestValue;
                highestValue = secondHighestValue;
                secondHighestValue = container;
            }
            console.log("Found second pair. Highest value updated:", highestValue);
        }
    }

    if (pairs) {
        console.log("Returning highest value:", highestValue);
        return highestValue;
    }

    console.log("No pairs found. Returning 0.");
    return 0;
}




function twoPairPoints(){
    let counter = Array(7).fill(0); // 7 as im counting dice face from 1-6

        for (let i = 0; i < values.length; i++) {
            counter[values[i]]++;
        }

        let numPairs = 0;
        let sum = 0;
        for (let i = 0; i < counter.length; i++) {
            if (counter[i] >= 2) {
                numPairs++;
                sum += i * 2;

                if (numPairs === 2) {
                    break;
                }
            }

        }
        return numPairs === 2 ? sum : 0;
}




function threeSamePoints() {
    let counter = Array(7).fill(0); // Initialiserer counter-array med 0'ere for at tælle forekomster af hver værdi

    // Tæller antallet af hver terningværdi
    for (let i = 0; i < values.length; i++) {
        counter[values[i]]++;
    }

    let sum = 0;

    // Loop gennem alle terningværdierne og find det første sæt af tre ens terninger
    for (let i = 1; i < counter.length; i++) {
        if (counter[i] >= 3) {
            sum = i * 3; // Beregner summen af tre ens terninger
            return sum; // Returnerer summen
        }
    }

    return 0; // Returnerer 0, hvis der ikke er fundet et sæt af tre ens terninger
}

function fourSamePoints() {
    let counter = Array(7).fill(0); // Initialiserer counter-array med 0'ere for at tælle forekomster af hver værdi

    // Tæller antallet af hver terningværdi
    for (let i = 0; i < values.length; i++) {
        counter[values[i]]++;
    }

    let sum = 0;

    // Loop gennem alle terningværdierne og find det første sæt af fire ens terninger
    for (let i = 1; i < counter.length; i++) {
        if (counter[i] >= 4) {
            sum = i * 4; // Beregner summen af fire ens terninger
            return sum; // Returnerer summen
        }
    }

    return 0; // Returnerer 0, hvis der ikke er fundet et sæt af fire ens terninger
}

function fullHousePoints() {
    let counter = Array(7).fill(0); // Initialiserer counter-array med 0'ere for at tælle forekomster af hver værdi

    // Tæller antallet af hver terningværdi
    for (let i = 0; i < values.length; i++) {
        counter[values[i]]++;
    }

    let threeFaceValue = false;
    let twoFaceValue = false;

    // Tjekker om der er mindst en terningværdi med en tredobbelt forekomst og mindst en terningværdi med en dobbelt forekomst
    for (let i = 1; i < counter.length; i++) {
        if (counter[i] == 3) {
            threeFaceValue = true;
        }
        if (counter[i] == 2) {
            twoFaceValue = true;
        }
    }

    // Hvis både en tredobbelt og en dobbelt forekomst er fundet, returneres summen af alle terningværdierne
    if (threeFaceValue && twoFaceValue) {
        let sum = 0;
        for (let i = 0; i < values.length; i++) {
            sum += values[i];
        }
        return sum;
    }

    return 0; // Returnerer 0, hvis der ikke er et fuldt hus
}

function smallStraightPoints(){
    let smallStraightPoints = 0;
    let count = 0;
    let uniqueValues = Array.from(new Set(values)); // Fjerner dubletter fra terningværdierne

    // Sorterer unikke værdier
    uniqueValues.sort((a, b) => a - b);

    for (let i = 0; i < uniqueValues.length - 1; i++) {
        // Tjekker om den aktuelle værdi er efterfølgeren til den forrige
        if (uniqueValues[i + 1] - uniqueValues[i] === 1) {
            count++;
        } else {
            count = 0; // Nulstiller tælleren, hvis der brydes en efterfølgersekvens
        }
    }

    // Hvis der er mindst fire efterfølgende værdier, er det en lille straight
    if (count >= 4) {
        smallStraightPoints = 15;
    }

    return smallStraightPoints;
}

function largeStraightPoints() {
    let largeStraightPoints = 0;
    let count = 0;

    // Tæller antallet af unikke værdier mellem 2 og 6 (inklusiv)
    for (let i = 2; i <= 6; i++) {
        if (sameValue(i) === 1) {
            count++;
        }
    }

    // Hvis der er fem unikke værdier (en for hver terning), er det en stor straight
    if (count === 5) {
        largeStraightPoints = 20;
    }

    return largeStraightPoints;
}

function chancePoints(){
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return sum;
}

function yatzyPoints() {
    for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[0]) {
            return 0; // Hvis der findes en værdi, der er forskellig fra den første, returneres 0
        }
    }
    return 50; // Hvis alle værdier er ens, returneres 50 (Yatzy)
}

function setThrowCount(x){
    throwCount = x
}

export{getValues,setValues,getThrowCount,throwDice,getResults,frequency,
    sameValuePoints,sameValue,onePairPoints,twoPairPoints,
threeSamePoints,fourSamePoints,fullHousePoints,smallStraightPoints,largeStraightPoints,
chancePoints,yatzyPoints,setThrowCount}
