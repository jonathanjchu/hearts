class Card {
    constructor(suit, number) {
        this.suit = suit;
        this.value = number;
        this.strValue = CARDVALUES[number];
        // this.imgName = (this.suit[0] + CARDVALUES[this.value]).toLowerCase();
        this.imgName = CARDVALUES[this.value] + this.suit[0];
    }

    show() {
        console.log(`${this.strValue} of ${this.suit}`);
    }

    getSuit() {
        return this.suit;
    }

    getImgName() {
        return this.imgName;
    }

    getStrValue() {
        // return this.strValue;
        return this.value + this.suit
    }

    // get numerical value
    getValue() {
        return this.value;
    }
}

const CARDNAMES = [
    "unknown",
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
];

const SUITS = {
    SPADES: "Spades",
    HEARTS: "Hearts",
    DIAMONDS: "Diamonds",
    CLUBS: "Clubs"
};

const CARDVALUES = [
    null,
    'A',
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    'J',
    'Q',
    'K'
]

module.exports = Card;