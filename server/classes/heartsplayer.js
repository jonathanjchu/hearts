const Card = require('./card');

class HeartsPlayer {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }

    startNewGame() {
        this.score = 0;
    }

    getHand() {
        return this.hand;
    }

    hasTwoOfClubs() {
        this.hand.forEach(c => {
            if (c.getSuit() == SUITS.CLUBS && c.getValue() == 2) {
                return true;
            }
        });

        return false;
    }

    hasSuit(suit) {
        for (let i = 0; i < this.hand.length; i++) {
            if (this.hand[i].SUITS == suit) {
                return true;
            }
        }

        return false;
    }

    startNewRound(cards) {
        this.hand = cards;
    }

    selectCard(card) {

    }

}

module.exports = HeartsPlayer;