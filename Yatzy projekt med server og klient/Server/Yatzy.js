
let playerList = [];

export function createPlayer(navn){
    playerList.push({
        navn: navn,
        platerState: {values:[5,1,2,3,4],holdStatus:[false, false, false, false, false],throwCount :0},
        resultList: {
        sameValue1:{value:0,valgt: false},
        sameValue2:{value:0,valgt: false},
        sameValue3:{value:0,valgt: false},
        sameValue4:{value:0,valgt: false},
        sameValue5:{value:0,valgt: false},
        sameValue6:{value:0,valgt: false},
        onePair:{value:0,valgt: false},
        twoPair:{value:0,valgt: false},
        threeSame:{value:0,valgt: false},
        fourSame:{value:0,valgt: false},
        fullHouse:{value:0,valgt: false},
        smallStraight:{value:0,valgt: false}, 
        largeStraight:{value:0,valgt: false},
        chance:{value:0,valgt: false},
         yatzy:{value:0,valgt: false},}
    })
    console.log("Spiller oprettet i yatzi metode delen " + playerList[0].navn)
}

export function getValues(playerName) {
    return getPlayerState(playerName).values
    
}
function getPlayerState(playerName) {
    let result = playerList.find((player)=>player.navn == playerName).platerState
    console.log("Player state " +result.values)
    return result
}

function getPlayerResultList(playerName){
    let result = playerList.find((player)=>player.navn == playerName).resultList
    console.log("Player result1 " + result.sameValue1.value)
    console.log("Player result2 " + result.sameValue2.value)
    console.log("Player result3 " + result.sameValue3.value)
    console.log("Player result4 " + result.sameValue4.value)
    console.log("Player result5 " + result.sameValue5.value)
    return result
}

function setValues(values1,playerName){
   getPlayerState(playerName).values = values1;
}


export function getThrowCount(playerName){ 
    return getPlayerState(playerName).throwCount
}


export function throwDice(playerName) {
    let newValues = []; // Kopierer arrayet values
     let values = getValues(playerName)
    let holdStatus = getPlayerState(playerName).holdStatus
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

    setValues(newValues,playerName); // Opdaterer terningværdierne
    getPlayerState(playerName).throwCount++; // Tæller antallet af kast op
}


export function numberOfPlayers(){
    return playerList.length
}

export function getPlayers(){
    return playerList

}



export function getResults(playerName){
    let results = getPlayerResultList(playerName)
        
   results.sameValue1.value = sameValuePoints(1,playerName)
   results.sameValue2.value = sameValuePoints(2,playerName)
   results.sameValue3.value = sameValuePoints(3,playerName)
   results.sameValue4.value = sameValuePoints(4,playerName)
   results.sameValue5.value = sameValuePoints(5,playerName)
   results.sameValue6.value = sameValuePoints(6,playerName)

    results.onePair.value = onePairPoints(playerName);
    results.twoPair.value = twoPairPoints(playerName);
    results.threeSame.value = threeSamePoints(playerName);
    results.fourSame.value = fourSamePoints(playerName);
    results.fullHouse.value = fullHousePoints(playerName);
    results.smallStraight.value = smallStraightPoints(playerName);
    results.largeStraight.value = largeStraightPoints(playerName);
    results.chance.value = chancePoints(playerName);
    results.yatzy.value = yatzyPoints(playerName);

    return results;
}

function sameValuePoints(value,playerName){
    let sum = 0;
    let values = getPlayerState(playerName).values
    // checking if index i is the same as the paramenter value, then it will at the number to sum
    for (let i = 0; i < values.length; i++) {
        if (values[i] == value) {
            sum += values[i];
        }
    }
    return sum;
}


function onePairPoints(playerName){

    let values = getPlayerState(playerName).values
    console.log("One pair  values"+ values)

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




function twoPairPoints(playerName){
    let values = getPlayerState(playerName).values
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


function threeSamePoints(playerName) {
    let counter = Array(7).fill(0); // Initialiserer counter-array med 0'ere for at tælle forekomster af hver værdi
    let values = getPlayerState(playerName).values
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


function fourSamePoints(playerName) {
    let counter = Array(7).fill(0); // Initialiserer counter-array med 0'ere for at tælle forekomster af hver værdi
    let values = getPlayerState(playerName).values
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


function fullHousePoints(playerName) {
    let counter = Array(7).fill(0); // Initialiserer counter-array med 0'ere for at tælle forekomster af hver værdi
    let values = getPlayerState(playerName).values
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


function smallStraightPoints(playerName){
    let smallStraightPoints = 0;
    let values = getPlayerState(playerName).values
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


function largeStraightPoints(playerName) {
    let largeStraightPoints = 0;
    let count = 0;

    // Tæller antallet af unikke værdier mellem 2 og 6 (inklusiv)
    for (let i = 2; i <= 6; i++) {
        if (sameValuePoints(i,playerName) === 1) {
            count++;
        }
    }

    // Hvis der er fem unikke værdier (en for hver terning), er det en stor straight
    if (count === 5) {
        largeStraightPoints = 20;
    }

    return largeStraightPoints;
}

function chancePoints(playerName){
    let sum = 0;
    let values = getPlayerState(playerName).values
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return sum;
}

function yatzyPoints(playerName) {
    let values = getPlayerState(playerName).values
    for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[0]) {
            return 0; // Hvis der findes en værdi, der er forskellig fra den første, returneres 0
        }
    }
    return 50; // Hvis alle værdier er ens, returneres 50 (Yatzy)
}