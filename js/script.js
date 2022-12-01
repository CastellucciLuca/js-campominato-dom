/*L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.*/

const campoMinato = document.getElementById('campoMinato');
/*--------------------------------------------------FUNZIONI-------------------------------------------------- */
//Funzione con cui creo elementi (square) nell'html
function getElementDiv (contentText,playground,printNumber) {
    let createdElement = document.createElement('div');
    // TESTO = ARGOMENTO INSERITO
    createdElement.innerText = contentText;
    // CLASSE CASELLA
    createdElement.classList.add('box', 'p-2');
    // APPENDO ARGOMENTO ALLA VARIABILE (campoMinato)
    playground.append(createdElement);
    createdElement.addEventListener ('click', function() {
        createdElement.classList.toggle('bgCarino');
        console.log(printNumber)
    })
    return createdElement;
}
//-------------------------------------------------
//FUNZIONE che genera numero randomico
function randomNumberBetweenLimits (minValue, maxValue) {
    const generatedNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    return generatedNumber;
}
//-------------------------------------------------
//CREO MINA con numero casuale, stando attento a non farla comparire più volte
function singleMinePosition (generatedNumbersList, minSquareNumber, maxSquareNumber) {
    let isValid = false;
    let randomNumber;

    while (isValid === false) {
        randomNumber = randomNumberBetweenLimits(minSquareNumber, maxSquareNumber);

        if (!generatedNumbersList.includes(randomNumber)) {
            generatedNumbersList.push(randomNumber);
            isValid = true;
        }
    }
    return randomNumber;
}
/*----------------------------------------------------------------------------
---------------------------------FINE FUNZIONI--------------------------------
------------------------------------------------------------------------------*/
let gameArea = document.getElementById('gameArea');

//variabile assegnata all'id del playButton
let play = document.getElementById('play');

//creazione array vuoto per la creazione delle mine
let minesArray = [];

//VARIABILE NUMERO MINE
const numberOfMines = 16;

//creazione variabile : quantitá di celle richiesta
let playgroundCells = 100;

// START CAMPOMINATO
play.addEventListener ('click', function() {
    // SVUOTO IL FOGLIO PRIMA DI FAR STARTARE IL CAMPOMINATO
    campoMinato.innerHTML = '';
// CICLO FOR PER CREARE 100 BOX
for ( let i = 0 ; i < numberOfMines ; i++) {
    singleMinePosition(minesArray, 1, playgroundCells)
}

for ( let i = 1 ; i < playgroundCells + 1 ; i++) {
    getElementDiv(i, campoMinato, i, minesArray);
}

console.log(minesArray)
});
