document.getElementById('btnSave').addEventListener('click', saveCard);
let cards = new Array();

function saveCard(){
    let frontContent = document.getElementById('frontCard').value;
    let backContent = document.getElementById('backCard').value;
    let card = {front: frontContent, back: backContent};
    cards.push(card);
    console.log(cards);
    clearUI();
    numCardsOut()
}

numCardsOut = () => {
    document.getElementById('numCards').innerHTML = cards.length;
}

clearUI = () => {
    document.getElementById('frontCard').value = "";
    document.getElementById('backCard').value = "";
}

