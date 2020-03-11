const Card = require('./card');

class Deck {
    constructor(numOfDecks=1) {
        this.numOfDecks = numOfDecks;
        this.reset();
    }

    addDeck() {
        for (var key in SUITS) {
            for (var i = 1; i <= 13; i++) {
                this.deck.push(new Card(SUITS[key], i));
            }
        }
    }

    reset() {
        this.deck = [];
        for (let i=0; i<this.numOfDecks; i++) {
            this.addDeck();
        }
    }

    showAll() {
        this.deck.forEach(function (card) {
            card.show();
        });
    }

    shuffle() {
        var m = this.deck.length, temp, rnd;

        // while there remain elements to shuffle…
        while (m) {

            // pick a remaining element…
            rnd = Math.floor(Math.random() * m--);

            // and swap it with the current element.
            temp = this.deck[m];
            this.deck[m] = this.deck[rnd];
            this.deck[rnd] = temp;
        }
    }

    dealCard() {
        return this.deck.pop();
    }

    getNumOfRemainingCards() {
        return this.deck.length;
    }
}

module.exports = Deck;