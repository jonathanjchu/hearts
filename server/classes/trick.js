const Card = require('./card');

class Trick {
    constructor() {
        this.cards = [];
        this.leadSuit = null;
        this.leadPlayerIndex = null;
        this.cardsInTrick = 0;
        this.trickSize = 4;
    }

    isEmpty() {
        return (this.cards.length == 0);
    }

    isTrickFull() {
        return this.cardsInTrick === this.trickSize;
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
        this.cardsInTrick++;
    }

    // returns the index of the player who won the trick
    determineTrickWinner() {
        let winner = this.leadPlayerIndex;

        for (let i = 0; i < this.trickSize; i++) {
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

    getLeadSuit() {
        return this.leadSuit;
    }

    getCardByPlayerIndex(index) {
        if (typeof this.cards[index] !== 'undefined') {
            return this.cards[index];
        }
        else {
            return null;
        }

    }

    getAllCardsInTrick() {
        return this.cards;
    }
}

module.exports = Trick;