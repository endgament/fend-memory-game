/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck')
let cardDeck = ['fa-cloud','fa-bug','fa-bolt','fa-fort-awesome',  
            'fa-pied-piper-alt','fa-snapchat-ghost','fa-twitter','fa-tree'];
const cards = cardDeck.concat(cardDeck); // so every card is double

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

 newGame();

function newGame() {
    let shuffleCards = shuffle(cards); //- shuffle the list of cards using the provided "shuffle" method below
    deck.innerHtml = "";
    const fragment = document.createDocumentFragment(); // create document fragment
    for (let i = 0; i < cards.length; i++) {
        deck.firstElementChild.remove(); // clear the deck
        let li = document.createElement('li'); // create list element as child
        li.classList.add('card');
        let icon = document.createElement('i'); // create icon element as child of list element
        icon.classList.add('fa', shuffleCards[i]);
        li.appendChild(icon);
        fragment.appendChild(li);
        li.addEventListener('click', flipCard); // add the event listener on the card
    } 
    deck.appendChild(fragment);
}

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

    if (openCards.length < 2) {
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

/* -------------END AND RESTART THE GAME -------------*/

function gameOver() {
   if (matchedCards.length === cards.length) { // checking if all the cards are open and matched
        openModal();
        stopTimer();
    }  
}

function restart() { //restart game 
    stopTimer();
    openCards = [];
    matchedCards = [];
    moves = 0;
    moveNumber.textContent = moves + ' Moves';
    let timing;
    timestarted = false;
    second = 0;
    minute = 0;
    time.textContent = minute + ' minutes ' + second + ' seconds ';
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    star = 3;
     
    newGame();
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
}

/* -------------TIMER -------------*/

function startTimer() {
    timing = setInterval(function() {
        second ++;
        if (second % 60 === 0) {
            second = 0;
            minute ++; 
        }
        time.textContent = minute + ' minutes ' + second + ' seconds '  ;
    }, 1000)  
}

function stopTimer() {
    clearInterval(timing);
    second = 0;
    minute = 0;
}

/* -------------MODAL -------------*/

function openModal() {
    myModal.style.display = 'block';  // opne the modal
    let Modal = document.getElementById('myModal');
    let message = document.getElementById('message');
    message.textContent = 'Your time was ' + time.textContent + '.' +
    'You finished in ' + moveNumber.textContent + ' and with ' + 
    star + ' stars.';
    window.onclick = function(event) { // if there is a click outside the modal, the modal window closes
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

/* -----------  EVENT LISTENERS  ---------- */

// there is one more event listener inside the newGame function

restartGame.addEventListener('click', function() { //restart game
    restart();
    newGame();
})

reset.addEventListener('click', function() { // reset game
    myModal.style.display = 'none';
    restart();
    newGame();
})