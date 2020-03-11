const Card = require('./card');

class Trick {
    constructor() {
        this.cards = [];
        this.leadSuit = null;
        this.leadPlayerIndex = null;
    }

    isEmpty() {
        return (this.cards.length == 0);
    }

    addCard(index, card) {
        // check if this is the first card of the trick
        if (this.isEmpty()) {
            // save lead suit and lead player
            this.leadSuit = card.getSuit();
            this.leadPlayerIndex = index;
        }

        // add card to trick
        this.cards[index] = card;
    }

    determineTrickWinner() {
        let winner = this.leadPlayerIndex;

        for (let i = 0; i < this.cards.length; i++) {
            if (winner === i) {
                // this is the current winner, continue loop
                continue;
            }
            else if (this.cards[i].getSuit() == this.leadSuit &&
                        this.cards[i].getValue() > this.cards[winner].getValue()) {
                // new 'winner'
                winner = i;
            }
        }

        return winner;
    }

    getCards() {
        return this.cards;
    }
}

module.exports = Trick;