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

    return createdElement;
}
//--------------------------------------------------
//funzione che aggiunge un addEventListener ad un div con relativo id
    //eventListener sulla casella creata
    function cellsInteraction (exceptionsList, element) {
        if (exceptionsList.includes(parseInt(element.innerText))) {
            element.addEventListener ('click', function () {
                if (gameWin) {
                    alert('YOU WIN');
                } else if (!gameOver) {
                    alert('BOOM BABY');
                    gameOver = true;
                }
            });
        } else {
            element.addEventListener ('click', function () {
                if (gameWin) {
                    alert('YOU WIN!');
                } else if (!gameOver) {
                    if (!element.classList.contains('bgCarino')) {
                        punteggio++;
                        element.classList.add('bgCarino');
                        element.innerText = '0';
                        console.log(punteggio);

                        if (punteggio == playgroundCells - numberOfMines) {
                            gameWin = true;
                        }
                        
                        if (gameWin === true) {
                            alert('YOU WIN!');
                        }
                    }

                } else {
                    console.log('Inizia un\'altra partita premendo il tasto play');
                    alert('Inizia un\'altra partita premendo il tasto play');
                }
            })
        }
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

//VARIABILI NEL GIOCO
let gameOver = false;
let punteggio = 0;
let gameWin = false;

// START CAMPO MINATO
// event listener che permette l'interazione con il playButton
play.addEventListener ('click', function() {
    // svuoto l'area prima di iniziare il ciclo che inserisce gli elementi
    campoMinato.innerHTML = '';
    // setto variabili su false per far interagire gli event listener
    gameOver = false;
    gameWin = false;
    // azzero il punteggio
    punteggio = 0;

    console.log(gameOver, gameWin, punteggio);
    // ciclo che esegue la funzione getElementDiv 100 volte, inserendo ogni volta il numero dell'interazione come testo dell'elemento inserito
    minesArray = [];

    for ( let i = 0 ; i < numberOfMines ; i++) {
        singleMinePosition(minesArray, 1, playgroundCells)
    }
    console.log(minesArray)
    
    for ( let i = 1 ; i < playgroundCells + 1 ; i++) {
    getElementDiv(i, campoMinato, idBoxesList);
    }

    for ( let i = 1 ; i < playgroundCells + 1 ; i++) {
        let elementId = document.getElementById(i);
        cellsInteraction(minesArray, elementId)
    }
});
