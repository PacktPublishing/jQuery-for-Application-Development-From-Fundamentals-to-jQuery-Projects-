let cards = new Array();
let currentCard = 0;
let frontCard=true;

init();

function init(){
    getCards();
    document.getElementById('card').addEventListener('click', displayNextCard);
    document.getElementById('btnFlip').addEventListener('click', flipCard);
}

function getCards() {
    localforage.getItem('flashcards').then(function(value) {
        cards = JSON.parse(value);
        document.getElementById('numCards').innerHTML = cards.length;
        console.log(cards);
    }).catch(function(err) {
        console.log(err);
    });
}

function displayNextCard(){
    document.getElementById('backCard').style.display = "none";
    document.getElementById('frontCard').style.display = "block";
    let front = cards[currentCard].front;
    let back = cards[currentCard].back;
    document.getElementById('frontCard').innerHTML = front;
    document.getElementById('backCard').innerHTML = back;
    document.getElementById('backCard').style.display = "none";
    document.getElementById('cardNum').innerHTML = currentCard + 1;
    if(currentCard < (cards.length -1)){
        currentCard++;
    } else {
        currentCard = 0;
    }
}

function flipCard() {
    if(frontCard) { 
        document.getElementById('backCard').style.display = "block";
        document.getElementById('frontCard').style.display = "none";
        frontCard = !frontCard;
    } else {
        document.getElementById('backCard').style.display = "none";
        document.getElementById('frontCard').style.display = "block";
        frontCard = !frontCard;
    }
}