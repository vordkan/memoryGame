document.addEventListener("DOMContentLoaded", () =>{
    // card option
    const cardArray = [
        {
            name   : "cheesburger",
            img    : "img/cheeseburger.png",
            girata : false
        },

        {
            name   : "fires",
            img    : "img/fries.png",
            girata : false
        },

        {
            name   : "hotdog",
            img    : "img/hotdog.png",
            girata : false
        },

        {
            name   : "ice-cream",
            img    : "img/ice-cream.png",
            girata : false
        },

        {
            name   : "milk-shake",
            img    : "img/milk-shake.png",
            girata : false
        },

        {
            name   : "pizza",
            img    : "img/pizza.png",
            girata : false
        },

        {
            name   : "cheesburger",
            img    : "img/cheeseburger.png",
            girata : false
        },

        {
            name   : "fires",
            img    : "img/fries.png",
            girata : false
        },

        {
            name   : "hotdog",
            img    : "img/hotdog.png",
            girata : false
        },

        {
            name   : "ice-cream",
            img    : "img/ice-cream.png",
            girata : false
        },

        {
            name   : "milk-shake",
            img    : "img/milk-shake.png",
            girata : false
        },

        {
            name   : "pizza",
            img    : "img/pizza.png",
            girata : false
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");


    var tempoFinale;
    var tempoIniziale;
    var tempoTotale;
    var seconds;
    var minutes;
    var tentativi = 0;
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    function createBoard(){
        tempoIniziale = new Date();
        for(let i = 0; i < cardArray.length; i ++){
            // creazione della carta
            var card = document.createElement("img");
            // setto gli attributi 
            card.setAttribute("src", "img/blank1.png");
            card.setAttribute("data-id", i);
            // quando ci clicco mi gira la carta
            card.addEventListener("click", flipcard);
            grid.appendChild(card);
        }
    }

    //check for match
    function checkForMatch() {
        var cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0]; 
        const optionTwoId = cardsChosenId[1];

        // se le carte combaciano allora aumenta lo score
        if (cardsChosen[0] === cardsChosen[1]) {
            //alert("You found a match");
            if (cards[optionOneId] && cards[optionTwoId]) { 
                cards[optionOneId].classList.add('fade-out');
                cards[optionTwoId].classList.add('fade-out');
                setTimeout(() => {
                    cards[optionOneId].setAttribute('src', '');
                    cards[optionTwoId].setAttribute('src', '');
                    cards[optionOneId].classList.remove('fade-out');
                    cards[optionTwoId].classList.remove('fade-out');
                    cards[optionOneId].style.visibility = 'hidden';
                    cards[optionTwoId].style.visibility = 'hidden';
                }, 10);
            }
            cardsWon.push(cardsChosen);
        } else {
            // altrimenti mi conto i tentativi e resetto le carte girate
            //alert("Sorry, try again");
            tentativi = tentativi + 1;
            resetCard(optionOneId);
            resetCard(optionTwoId);
            if (cards[optionOneId] && cards[optionTwoId]) { 
                cards[optionOneId].setAttribute('src', 'img/blank1.png');
                cards[optionTwoId].setAttribute('src', 'img/blank1.png');
            }
        }

        // se supero i tentativi mi ricarica la pagina
        if(tentativi > 8){
            alert("Game Over");
            window.location.reload();
        }
        
        // mi resetto le variabili
        cardsChosen = [];
        cardsChosenId = [];
        
        // stampo lo score sull' html
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {  
            tempoFinale = new Date();
            tempoTotale = tempoFinale - tempoIniziale;
            seconds = Math.floor(tempoTotale / 1000); 
            minutes = Math.floor(seconds / 60);    
            seconds = seconds % 60;                    
            resultDisplay.textContent = "Congratulations! You found them all. Your time is: " + minutes + ":" + seconds;
        }
    }
    

    function flipcard() {
        // vado a prendermi l'id
        var cardId = this.getAttribute("data-id");
        
        // controllo se la carta non è stata già girata
        if (cardArray[cardId].girata === true || cardsChosen.length === 2) {
            alert("Carta già girata");
            return;
        }
        
        // imposto il valore su true
        cardArray[cardId].girata = true;

        // inserisco la carta nell'array
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);

        // mostro che carta ho girato
        this.setAttribute("src", cardArray[cardId].img);
    
        // controllo quante carte ho cliccato e se ne sono due mi vado a richiamare la funzione per vedere se le carte girate sono giuste
        if (cardsChosen.length === 2) {
            grid.style.pointerEvents = "none"
            setTimeout(() => {
                checkForMatch();
                grid.style.pointerEvents = "auto"
            },1000);
        }
    }

    // Resetto le carte a false 
    function resetCard(cardId){
        cardArray[cardId].girata = false;
    }

    createBoard();
})