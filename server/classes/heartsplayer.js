const Card = require('./card');

class HeartsPlayer {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
        this.cardsWon = [];
    }

    startNewGame() {
        this.score = 0;
    }

    // new round, clear hand
    startNewRound() {
        this.hand = [];
        this.cardsWon = [];
    }

    receiveCard(card) {
        this.hand.push(card);
    }

    getHand() {
        return this.hand;
    }

    // check if this player has the 2 of clubs
    hasTwoOfClubs() {
        return this.hasCard(new Card(SUITS.CLUBS, 2));
    }

    // check if this player has a card of the given suit in his/her hand
    hasSuit(suit) {
        for (let i = 0; i < this.hand.length; i++) {
            if (this.hand[i].SUITS == suit) {
                return true;
            }
        }

        return false;
    }

    hasCard(card) {
        // check if player has the card
        for (let a = 0; a < this.hand.length; a++) {
            if (this.hand[a].getValue() == card.getValue() && this.hand[a].getSuit() == card.getSuit()) {
                return true;
            }
        }

        return false;
    }

    // check if the given card is a valid play by this player
    canPlayCard(card, leadSuit, isHeartsBroken, isLeadingTrick) {

        if (!this.hasCard(card)) {
            // player does not have this card in hand
            return false;
        }

        if (isLeadingTrick) {
            // this is the first card in the trick
            if (card.getSuit() == SUITS.HEARTS && !isHeartsBroken) {
                // player is starting with hearts, but hearts is not broken
                // check if player is any other suits
                for (let i = 0; i < this.hand.length; i++) {
                    if (this.hand[i].getSuit() != SUITS.HEARTS) {
                        // hearts is not broken, and player is trying to lead with hearts
                        //  even though they have other suits available
                        return false;
                    }
                }

                // player only has hearts, so leading with hearts is ok
                return true;
            }
        }
        else {
            // check if player has lead suit
            if (card.getSuit() != leadSuit && this.hasSuit(leadSuit)) {
                // player has leading suit, but did not play it
                return false;
            }
        }
        
        return true;
    }

    // receive the cards the player won in the trick
    receiveWinningCards(cards) {
        this.cardsWon = this.cardsWon.concat(cards);
    }

    calculateScore() {
        let score = 0;
        
        for (let i = 0; i < this.cardsWon.length; i++) {
            if (this.cardsWon[i].getSuit() == SUITS.HEARTS) {
                score++;
            }
            else if (this.cardWon[i].getSuit() == SUITS.SPADES && this.cardsWon[i].getValue() == 'Q') {
                score += 13;
            }
        }

        // add score from this round to player score unless player 'shot the moon'
        if (score < 26) {
            this.score += score;
        }

        return score;
    }

    // add points to player score (mainly for use if another player 'shot the moon')
    addPoints(points) {
        this.score += points;
    }

    selectCard(card) {

    }

}

module.exports = HeartsPlayer;