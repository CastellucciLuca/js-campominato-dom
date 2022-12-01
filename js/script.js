/*L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.*/
/*------------------------------------------------------------------------------
--------------------------------- FUNZIONI--------------------------------------
------------------------------------------------------------------------------*/
//
function eventListenersRemover (array) {
    for (i=1 ; i < array.length; i++) {
        let indexVariable = document.getElementById(i);
        indexVariable.removeEventListener ('click', clickEmptyBox, true)
    }
}
//Quando l'utente clicca una bomba
function clickBombBox () {
    alert('BOOOOOOOOM BABY!')
    //Rimozione degli event listener
    for (i=0 ; i < 100; i++){
        document.getElementById(`${i}`).removeEventListener ('click', clickBombBox, true)
    }
}
//Quando l'utente clicca una casella neutra
function clickEmptyBox () {
    console.log(this.id);
}
//----------------------------------------------------
//Funzione con cui creo elementi (square) nell'html
function getElementDiv (contentText,playground,idBoxes,gameRules) {
    let createdElement = document.createElement('div');
    // TESTO = ARGOMENTO INSERITO
    createdElement.innerText = contentText;
    // CLASSE CASELLA
    createdElement.classList.add('box', 'p-2');
    // APPENDO ARGOMENTO ALLA VARIABILE (campoMinato)
    playground.append(createdElement);
    //Creo ID Ad Ogni BOX
    createdElement.id = contentText
    //Aggiungo l'id ad ogni Box
    idBoxes.push(createdElement.id)
    //Event Listener box (casellina box gioco)
    if (gameRules.includes(parseInt(createdElement.innerText))) {
        createdElement.addEventListener ('click', clickBombBox,true);
        } else {
        createdElement.addEventListener ('click', clickEmptyBox,true) 
    }
    return createdElement;
}

//--------------------------------------------------
//FUNZIONE che genera numero randomico
function randomNumberBetweenLimits (minValue, maxValue) {
    const generatedNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    return generatedNumber;
}
//--------------------------------------------------
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
let campoMinato = document.getElementById('campoMinato');

//variabile assegnata all'id del playButton
let play = document.getElementById('play');

//creazione array vuoto per la creazione delle mine
let minesArray = [];
//Variabile id box
const idBoxesList = []
//VARIABILE NUMERO MINE
const numberOfMines = 16;

//creazione variabile : quantitá di celle richiesta
let playgroundCells = 100;

// START CAMPO MINATO
play.addEventListener ('click', function() {
    // SVUOTO IL FOGLIO PRIMA DI FAR STARTARE IL CAMPOMINATO
    campoMinato.innerHTML = '';
    // CICLO FOR PER CREARE 100 BOX
    for ( let i = 0 ; i < numberOfMines ; i++) {
        singleMinePosition(minesArray, 1, playgroundCells)
    }
    //Se colpisco una mina mi segna il numero della casella nella console
    console.log(minesArray);
    for ( let i = 1 ; i < playgroundCells + 1 ; i++) {
        getElementDiv(i, campoMinato,minesArray,idBoxesList);
    }
});
