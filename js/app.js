/*
 * Create a list that holds all of your cards
 */


/* ---------  DECLARATIONS   ------------*/
const moveNumber = document.querySelector('.moves');
const time = document.querySelector('.timer');
const stars = document.querySelector('.stars');
const restartGame = document.querySelector('.restart');
const reset = document.querySelector('.reset');
const modalWin = document.querySelector('#winModal');
const message = document.querySelector('#message');

let openCards = [];
let matchedCards = [];
let moves = 0;
let timing;
let timestarted = false;
let second = 0;
let minute = 0;
let star = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 /* -------------FLIPPING THE CARDS -------------*/

function flipCard() {
    if (!timestarted) { // starting the timer just once and not with every flip
        startTimer(); 
        timestarted= true;
    }
    this.classList.toggle('open'); // open the card
    this.classList.toggle('show'); // show the card's symbol
    this.classList.toggle('noClick'); // remove the possibility of clicking the same card again
    openCards.push(this);

    if (openCards.length === 2) { // checking if there are two cards open
        moveCounter();
        if (openCards[0].innerHTML === openCards[1].innerHTML) { //+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
            matchCards(openCards[0]);
            matchCards(openCards[1]);
            openCards = [];
        }  
        else { //+ if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
            setTimeout(noMatch, 600);
        }       
    }
    gameOver();    
}

/* -------------CHECK IF THE CARDS MATCH OR NOT -------------*/

function matchCards(e) {  //+ if the cards do match, lock the cards in the open position
    e.classList.add('match');
    e.classList.remove('open','show');
    matchedCards.push(e);
}

function noMatch() {  //+ if the cards do not match, remove the cards from the list and hide the card's symbol
    openCards[0].classList.remove('open','show', 'noClick');
    openCards[1].classList.remove('open','show', 'noClick');
    openCards = [];
}

/* -------------MOVE COUNTER AND STAR RATING -------------*/

function moveCounter() {  //+ increment the move counter and display it on the page
    moves +=1;
    moveNumber.textContent = moves + ' Moves';
    if (moves === 15) {
        stars.firstElementChild.remove(); // remove one star
        star--;
    }
    if (moves === 25) {
        stars.firstElementChild.remove();
        star--;
    }
    if (moves === 35) {
        stars.firstElementChild.remove();
        star--;
    }   
}