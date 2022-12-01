/*L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.*/

const campoMinato = document.getElementById('campoMinato');

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
//Variabile con id #play
let play = document.getElementById('play');
// START CAMPOMINATO
play.addEventListener ('click', function() {
    // SVUOTO IL FOGLIO PRIMA DI FAR STARTARE IL CAMPOMINATO
    campoMinato.innerHTML = '';
// CICLO FOR PER CREARE 100 BOX
for ( let i = 1 ; i < 101 ; i++) {
    getElementDiv(i, campoMinato, i);
}
});