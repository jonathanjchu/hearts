const Deck = require('./deck');
const HeartsPlayer = require('./heartsplayer');
const HeartsAI = require('./heartsai');
const Trick = require('./trick');

class Hearts {
    constructor() {
        this.players = [];
        this.playerNames = [];
        this.deck = new Deck();

        this.currentPlayer = null;
        this.currentTrick = null;
        this.isHeartsBroken = false;
        this.numOfPlayers = 4;
    }

    addPlayer(name) {
        if (this.players.length < this.numOfPlayers) {
            this.players.push(new HeartsPlayer(name));
            this.playerNames.push(name);
        }
    }

    startNewGame() {
        // check if we have 4 players
        if (this.players.length < this.numOfPlayers) {
            // add computer players as needed
            let numAi = this.numOfPlayers - this.players.length;
            for (let i = 0; i < numAi; i++) {
                this.players.push(new HeartsAI);
                this.playerNames.push("CPU" + i);
            }
        }
    }

    startNewRound() {
        this.isHeartsBroken = false;

        // deal cards
        while(this.deck.getNumOfRemainingCards() > 0) {
            for (let j = 0; j < this.numOfPlayers; j++) {
                this.players[j].receiveCard(this.deck.dealCard());
            }
        }
    }

    findPlayerWithTwoOfClubs() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players.hasTwoOfClubs()) {
                this.currentPlayer = i;
                return;
            }
        }

        // error
    }

    startNewTrick() {
        this.currentTrick = new Trick();
    }

    playCard(name, card) {
        let playerIndex = this.getPlayerIndexByName(name);

        if (playerIndex === this.currentPlayer) {
            // check that this play is valid
            if (this.players[playerIndex].canPlayCard(card,
                                                        this.currentTrick.leadSuit(),
                                                        this.isHeartsBroken,
                                                        this.currentTrick.isEmpty())) {
                // remove card from player's hand
                this.players[playerIndex].removeCard(card);

                // add card to trick
                this.currentTrick.addCard(index, card);

                // if this card is a heart, then hearts is now broken
                if (card.getSuit() == SUITS.HEARTS) {
                    this.isHeartsBroken = true;
                }

                // next player's turne
                this.currentPlayer++;
                if (this.currentPlayer >= 4) {
                    this.currentPlayer = 0;
                }

            }
            else
            {
                // return error message
            }
        }
        else {
            // wrong player!
        }
    }

    // check if the given player can select the given card in his/her hand
    canPlayerSelectCard(name, card) {
        let playerIndex = this.getPlayerIndexByName(name);

        return this.players[playerIndex].canPlayCard(card,
                                        this.currentTrick.leadSuit(),
                                        this.isHeartsBroken,
                                        this.currentTrick.isEmpty());
    }

    getCurrentPlayerName() {
        return this.playerNames[this.currentPlayer];
    }

    getPlayerIndexByName(name) {
        for (let i = 0; i < this.playerNames.length; i++) {
            if (this.playerNames[i] === name) {
                return i;
            }
        }

        // error - player not found
    }

    // return all of the cards in the given player's hand
    getPlayerCards(name) {
        let playerIndex = this.getPlayerIndexByName(name);

        this.players[playerIndex].getHand();
    }

    // get data that will be sent to the client
    getGameData(name) {
        let playerIndex = this.getPlayerIndexByName(name);

        let trickCards = {};
        
        for (let i = 0; i < this.players.length; i++) {
            trickCards[this.playerNames[i]] = this.currentTrick.getCardByPlayerIndex(i);
        }

        return {
            trickCards: trickCards,
            playerCards: this.players[playerIndex].getPlayerCards(),
            currentPlayerName: this.getCurrentPlayerName()
        };
    }


}

module.exports = Hearts;