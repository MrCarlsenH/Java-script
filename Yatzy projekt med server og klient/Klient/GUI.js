import{getValues,throwDice,getThrowCount,createPlayer,playerResults,numberOfPlayers,getPlayers}from"./YatzyFacade.js"

async function showValues(){
    await throwDice()
    let values = await getValues()
    let dice1 =document.getElementById("terning1") 
  
   
}
let throwKnap = document.getElementById("button1")
let sameValue1 = document.getElementById("samesInput1")
let sameValue2 = document.getElementById("samesInput2")
let inputPlayer = document.getElementById("specialInputSpiller")
let spillerListe = document.getElementById("spillerListe")



let playerName = "Per";

async function setUpPlayer(){
    await createPlayer({playerName})
}

setUpPlayer()





    







throwKnap.onclick =  throwDiceGUI


    async function throwDiceGUI() {

        inputPlayer.value =  await numberOfPlayers()
        

      
        await throwDice(playerName)
        let terningsArea = document.querySelector("#terningArea")
        let inputThrow = document.getElementById("throwCounter")
        //fjerner eksisterende terningbilleder
        // input.value = getThrowCount()
        let values = await getValues(playerName)

        for (let i = 0; i < values.length; i++) {
            // if (!holdStatus[i]) {
                let img = document.querySelector("#terning" + (i + 1))
                img.src = getFaceValue(values[i])
            // }
        }

        console.log("Throwcount gui " + getThrowCount(playerName))

     let throwCount = await getThrowCount(playerName);
     inputThrow.value = await throwCount

     sameValue1.value = (await playerResults(playerName)).sameValue1.value
     sameValue2.value = (await playerResults(playerName)).sameValue2.value

        // chosenInputField = true;
        // setValuesInput()
        // setSpecialValuesInput()

        // showValues()

        // console.log(getThrowCount())
        // if ((getThrowCount() % 3) == 0) {
        //     console.log(getThrowCount())
        //     sumTotal.value = (parseInt(sumSameValues.value) + parseInt(sumSameSpecialValues.value)) + (parseInt(bonusSameValues.value))
        //     alert("Tre kast er kastet! Vælg et felt")
        //     knap.disabled = true
        // }
    }


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



  


    // function getResults(id){
    //     let value = 0
    //     if (id == "samesInput1") {
    //         value = getResults()[0]
    //     } else if (id == "samesInput2") {
    
    //         value = getResults()[1]
    //     }
    //     else if (id == "samesInput3") {
    //         value = getResults()[2]
    
    //     } else if (id == "samesInput4") {
    //         value = getResults()[3]
    
    
    //     } else if (id == "samesInput5") {
    //         value = getResults()[4]
    
    
    //     } else if (id == "samesInput6") {
    //         value = getResults()[5]
    //     }
    //     return value;

    // }


