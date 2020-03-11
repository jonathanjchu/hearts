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
    }

    addPlayer(name) {
        if (this.players.length < 4) {
            this.players.push(new HeartsPlayer(name));
            this.playerNames.push(name);
        }
    }

    startNewGame() {
        // check if we have 4 players
        if (this.players.length < 4) {
            // add computer players as needed
            let numAi = 4 - this.players.length;
            for (let i = 0; i < numAi; i++) {
                this.players.push(new HeartsAI);
                this.playerNames.push("CPU" + i);
            }
        }
    }

    startNewRound() {
        this.isHeartsBroken = false;
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

    playCard(card, name) {
        let playerIndex = this.getPlayerIndexByName(name);

        if (playerIndex === this.currentPlayer) {
            // check if player has this card
            if (this.players[playerIndex].hasCard(card)) {
                // remove card from player's hand
                this.players[playerIndex].removeCard(card);

                this.currentTrick.addCard(index, card);

                // next player
                this.currentPlayer += 1;
                if (this.currentPlayer >= 4) {
                    this.currentPlayer = 0;
                }
            }
        }
        else {
            // wrong player!
        }
    }

    getPlayerIndexByName(name) {
        for (let i = 0; i < this.playerNames.length; i++) {
            if (this.playerNames[i] === names) {
                return i;
            }
        }

        // error;
    }

    getPlayerCards(name) {
        let playerIndex = this.getPlayerIndexByName(name);

        this.players[playerIndex].getHand();
    }


}

module.exports = Hearts;