const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const rescult = document.getElementById("rescult");
const controls = document.querySelector(".controls-container")
// select karne wala hisa khatam

let cards;
let intervals;
let firstCard = false;
let secondCard = false;

// game array

const items = [{ name: "bee", image: "bee.png" },
{ name: "bee", image: "bee.png" },
{ name: "lion", image: "lion.png" },
{ name: "camel", image: "camel.png" },
{ name: "dog", image: "dog.png" },
{ name: "raccon", image: "raccon.png" },
{ name: "gorillaw", image: "gorillaw.png" },
{ name: "tiger", image: "tiger.png" },
{ name: "crocodile", image: "crocodile.png" },
{ name: "macaw", image: "macaw.png" },
{ name: "hen", image: "hen.png" },
{ name: "monkey", image: "monkey.png" },
];

// Initial Time

let seconds = 0,
    minutes = 0;

// Initial moves and count

let movesCount = 0,
    winCount = 0;

// for timer

const timeGenerator = () => {
    seconds += 1;
    // minutes logic

    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    // format time before displaying

    let secondsValue = seconds < 10 ? `0${seconds}` :
        seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` :
        minutes;
    timeValue.innerHTML = `<span>Time</span>${minutesValue}
:${secondsValue}`;
};

// For calculating moves

const moveCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves</span>${movesCount}`;
}

// pick random objects from the item array

const generateRandom = (size = 4) => {
    // Temporary Array
    let tempArray = [...items];
    // initialize card values aray
    let cardValues = [];
    // size should be doubled(4*4) matrix/2 since pairs of object exist
    size = (size * size) / 2;
    // Random object selection
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() *
            tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        // once the object is selected and then removed
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
}

// matrix generator

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        // create cards
        // before they contain question marks
        // after they contain actual images
        gameContainer.innerHTML += `<div class="card-container" data-card-value =
         "${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/></div>
            </div>`;
        //  grid
        gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
        // Cards
        cards = document.querySelectorAll(".card-container");
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                // matched card
                if (!card.classList.contains("matched")) {
                    // flip the clicked card
                    card.classList.add("flipped");
                    // first card initially false
                    if (!firstCard) {
                        // so current card will become first
                        firstCard = card;
                        // current cards value become first card
                        firstCardValue = card.getAttribute
                            ("data-card-value");
                    } else {
                        // increaments moves
                        moveCounter();
                        // second card and value
                        secondCard = card;
                        let secondCardValue = card.getAttribute("data-card-value")
                        if (firstCardValue == secondCardValue) {
                            firstCard.classList.add("matched");
                            secondCard.classList.add("matched");
                            firstCard = false;
                            winCount += 1;
                            if (winCount == Math.floor(cardValues.length / 2)) {
                                rescult.innerHTML = `<h2>You Won</h2>
        <h4>Moves:${movesCount}</h4>`;
                                stopGame();
                            }
                        }
                        else {
                            let [tempFirst, tempSecond] = [firstCard, secondCard];
                            firstCard = false;

                            secondCard = false;
                            let delay = setTimeout(() => {
                                tempFirst.classList.remove("flipped");
                                tempSecond.classList.remove("flipped");
                            }, 900);
                        }
                    }
                };
             });
        })
    }
};
// initializing functions and calls

const initializer = () => {
    rescult.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

initializer();
   // start game
   startButton.addEventListener("click", () => {
    movesCount = 0;
    // minutes = 0; // Reset minutes
    seconds = 0; // Reset seconds
    // controls and buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    // initial moves
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
    initializer();
});

// stop game?
stopButton.addEventListener("click",(stopGame = () =>{
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);

})
);