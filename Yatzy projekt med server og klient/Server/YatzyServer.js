import express from 'express';
import{getValues,throwDice,getThrowCount,createPlayer,getResults,numberOfPlayers,getPlayers    } from "./Yatzy.js"
// import Yatzyyy from "./Yatzy.js"
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"
import sessions from 'express-session';
import { renderFile } from 'pug';
import { join } from 'path';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const app = express();
let port = 8000
const __filename = fileURLToPath(import.meta.url);
// Yatzyyy.getResults

const __dirname = path.dirname(__filename);
app.use(express.json());

app.use(sessions({ secret: 'hemmelig', saveUninitialized: true,
 cookie: { maxAge: 1000 * 60 * 20 }, resave: false }));

app.use(express.static(__dirname + '/../Klient'));

//Cors 
// app.use((req, res, next) => {
//     // spørg klaus om det her
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods','PUT')
//     res.header('Access-Control-Allow-Headers','content-type')
//     next()
// })





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrCHD2oyCyqdWBnKMdasyLeNEgAcs6tFs",
  authDomain: "yatzy-b02c3.firebaseapp.com",
  projectId: "yatzy-b02c3",
  storageBucket: "yatzy-b02c3.appspot.com",
  messagingSenderId: "358875068036",
  appId: "1:358875068036:web:713c556aa48009ef2774d1",
  measurementId: "G-1F0XS282PX"
};


// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app2);

app.set('view engine', 'pug');
app.set('views', join(__dirname, '/views'));

app.use(cors())

function createPlayerNPC(playerName) {
    return {
        playerName: playerName,
        playerState: {
            values: [0, 0, 0, 0, 0],
            holdStatus: [false, false, false, false, false],
            throwCount: 0
        },
        resultList: {
            sameValue1: { value: 0, valgt: false },
            sameValue2: { value: 0, valgt: false },
            sameValue3: { value: 0, valgt: false },
            sameValue4: { value: 0, valgt: false },
            sameValue5: { value: 0, valgt: false },
            sameValue6: { value: 0, valgt: false },
            onePair: { value: 0, valgt: false },
            twoPair: { value: 0, valgt: false },
            threeSame: { value: 0, valgt: false },
            fourSame: { value: 0, valgt: false },
            fullHouse: { value: 0, valgt: false },
            smallStraight: { value: 0, valgt: false },
            largeStraight: { value: 0, valgt: false },
            chance: { value: 0, valgt: false },
            yatzy: { value: 0, valgt: false }
        }
    };
}

function createGame(gameName, status, playerNames) {
    const spillere = {};
    playerNames.forEach((name, index) => {
        spillere[`player${index + 1}`] = createPlayerNPC(name);
    });
    return {
        game: gameName,
        status: status,
        spillere: spillere
    };
}

function getRandomStatus() {
    const statuses = ["WAITING", "STARTED"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function createGames(numGames, playersPerGame) {
    const rooms = {};
    for (let i = 1; i <= numGames; i++) {
        const playerNames = [];
        for (let j = 1; j <= playersPerGame; j++) {
            playerNames.push(`Player${j}`);
        }
        const status = getRandomStatus();
        rooms[`spil${i}`] = createGame(`Spil ${i}`, status, playerNames);
    }
    return { rooms: rooms };
}

// Usage example
let valuesForTemplate = createGames(100, 3);
console.log(valuesForTemplate);


app.get('/', (req, response) => response.render('startYatzy', valuesForTemplate))

app.post('/opretPlayer',(request,response)=>{
    console.log("Spiller oprettet: " + request.body.playerName)
    createPlayer(request.body.playerName)

})

app.get('/values/:playerName', (request, response) => {
    console.log("playerName server " + request.params.playerName)
    let beskeder = getValues(request.params.playerName)
    response.status(200);
    response.send(beskeder);
});

app.get('/throwcount/:playerName',(request,response)=>{
    let besked = getThrowCount(request.params.playerName)
    console.log(getThrowCount(request.params.playerName))
    response.status(200)
    response.send({ThrowCount:besked})
})


app.put('/throwDice',(request,response)=>{
    console.log("throwDice " + request.body.playerName)
    throwDice(request.body.playerName)
    response.sendStatus(200)
})


app.get('/playerResult/:playerName',(request,response)=>{
    console.log("playerName server " + request.params.playerName)
    let beskeder = getResults(request.params.playerName)
    response.status(200);
    response.send(beskeder);

})

app.get("/numberOfPlayers",(request,response)=>{

    let beskeder = numberOfPlayers()
    response.status(200).send({numberOfPlayers:beskeder})
})

// app.get("/getPlayers",(request,response)=>{

//     let beskeder = getPlayers()
//     response.status(200).send(beskeder)

// }
// )






app.listen(port)
console.log('Lytter på port ' + port + ' ...');