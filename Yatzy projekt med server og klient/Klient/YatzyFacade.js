
const url1 ="http://localhost:8000/values"
const url2 ="http://localhost:8000/throwDice"
const url3 ="http://localhost:8000/throwcount"
const url4 ="http://localhost:8000/opretPlayer"
const url5 ="http://localhost:8000/playerResult"
const url6 ="http://localhost:8000/numberOfPlayers"
const url7 ="http://localhost:8000/getPlayers"

//Hjælpe funktioner
async function get(url) { // dette er hjælpe funktionen
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
         throw new Error(respons.status);
    return await respons.json();     }

    


    async function put(url, objekt) {
        const respons = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(objekt),
            headers: { 'Content-Type': 'application/json' }

        });

        
        console.log(respons)
        if (respons.status !== 200) // OK muligvis forkert med 200 afhængig af hvad server sender tilbage
            throw new Error(respons.status);
        return await respons.json();
    }


    async function post(url, objekt) {
        const respons = await fetch(url, {
            method: "POST",
            body: JSON.stringify(objekt), //får ind som objekt derfor skal det stringify i parameter 
            headers: { 'Content-Type': 'application/json' }
        });
        if (respons.status !== 201) // Created kan måske udvides til at håndtere mere end 201 afhængig af server
            throw new Error(respons.status);
        return await respons.json();
    }


 export async function createPlayer(navn){
    try{
        await post(url4,navn)
    }catch(fejl){
        console.log(fejl)
    }
 }   






export async function getValues(playerName) {
    try {
        let respons = await get(url1+"/"+playerName); //kalder hjælpe funktion et promise
        console.log(respons +" HEJ")
        return respons
    }

    catch (fejl) {
        console.log(fejl);
    }
}



export async function getThrowCount(playerName){
    try {
        let respons = await get(url3+"/"+playerName); //kalder hjælpe funktion et promise
        console.log(respons +" HEJ2")
        return respons.ThrowCount
    }

    catch (fejl) {
        console.log(fejl);
    }
    
}



      
        
        
        export async function throwDice(playerName){
            try {
                let respons = await put(url2,{playerName}); 
                console.log(respons);
                return respons;
            } catch (fejl) {
                console.log(fejl);
            }

        }

   export async function playerResults(playerName){
    try {
        let respons = await get(url5+"/"+playerName)
        console.log(respons +" results klient")
        return respons

    }
    catch (fejl) {
        console.log(fejl);
    }
   }

        

    
 export async function numberOfPlayers(){
    try{
        let respons = await get(url6)
        console.log("Antal spiller "+ respons.numberOfPlayers)
        return respons.numberOfPlayers

    }catch(fejl){
        console.log(fejl)
    }
 }
          
        
      
 export async function getPlayers(){
    try{
        let response = await get(url7)
        return response
        
    }catch(fejl){
        console.log(fejl)

    }
 }
 