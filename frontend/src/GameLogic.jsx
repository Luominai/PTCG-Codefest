import GetCards from "./CardSearch";

// global variables that you can change if needed
const GLOBAL_ROUND = 10;
const CARD_TYPES = ["normal", "holofoil", "reverseHolofoil", "1stEditionHolofoil", "1stEditionNormal"];

let card1;
let card2;
let price1 = 0; // made them outside grabCards so we can export
let price2 = 0; // if we want to reveal the prices of the cards after a guess
let round = 1;
let score = 0;
let message = "";
let guessed = false; // flag for if the user guessed or not (clicked a card)
let readyForNextRound = false; // flag to see if user is ready for the next round (maybe they click for next round?)

async function grabCards()
{
    const grabbedCards = await GetCards(0, 25, CARD_TYPES[0]); // can tweak params if needed
    const cards = grabbedCards.data;

    // pick 2 cards randomly from our fetched cards
    const random1 = cards[Math.floor(Math.random() * cards.length)];
    const random2 = cards[Math.floor(Math.random() * cards.length)];

    card1 = random1;
    card2 = random2;
    guessed = false; // reset guess
}

// this will be called when the user makes a guess, I presume by clicking
function handleGuess(guess)
{
    // check if they guessed already (prevent multiple clicks)
    if (guessed)
    {
        message = "You've made a guess already";
        return;
    }
    // check for price safely; some cards may not have a price so default to 0.
    // also can change .normal to whatever type we want with the array; I can't be asked to write that in myself lol
    price1 = card1.tcgplayer?.prices?.normal?.market || 0;
    price2 = card2.tcgplayer?.prices?.normal?.market || 0;

    // mental note for myself that this might be the only thing needed to debug if any bugs arise
    if ((price1 > price2 && guess.id === card1.id)
        || (price2 > price1 && guess.id === card2.id))
    {
        ++score;
        message = "You guessed correct!";
    }
    else
    {
        message = "You guessed wrong!";
    }
    guessed = true;
    readyForNextRound = true;
}

// I guess this would be like a button for the user to click to move to the next round
function nextRound()
{
    if (round < GLOBAL_ROUND)
    {
        ++round;
        readyForNextRound = false; // reset flag
        message = ""; // reset the message
        grabCards(); // get new cards, this could impact our rate limits so might have to change something or get the key working
    }
}

// getters
function getCard1() {return card1;}
function getCard2() {return card2;}
function getPrice1() {return price1;}
function getPrice2() {return price2;}
function getRound() {return round;}
function getScore() {return score;}
function getMessage() {return message;}
function getGuessed() {return guessed;}
function getReadyForNextRound() {return readyForNextRound;}

export {
    getCard1,
    getCard2,
    getPrice1,
    getPrice2,
    getRound,
    getScore,
    getMessage,
    getGuessed,
    getReadyForNextRound,
    handleGuess,
    nextRound,
    grabCards
};