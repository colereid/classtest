const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const suits = ['hearts', 'diamonds', 'spades', 'clubs'];

class Deck {
  /**
   * Generate a deck of playing cards.
   * @param {excludeJokers} excludeJokers - Should jokers be included in the deck
   */
  constructor(excludeJokers = false) {
    this.excludeJokers = excludeJokers;
    this.ranks = ranks;
    this.suits = suits;

    // generate the deck of cards based on the suits and ranks
    this.generateDeck();

    // an array of delt cards
    this.deltCards = [];
  }

  /**
   * Get the excludeJokers value.
   * @return {boolean} excludeJokers value.
   */
  get excludeJokers() {
    return this._excludeJokers;
  }

  /**
   * Set the excludeJokers value.
   * @param {boolean} excludeJokers value.
   */
  set excludeJokers(value) {
    if (typeof value !== 'boolean') throw new Error('excludeJokers must be a boolean');
    this._excludeJokers = value;
  }

  /**
   * Get the array of suits.
   * @return {array} suits as strings.
   */
  get suits() {
    return this._suits;
  }

  /**
   * Set the suits value.
   * @param {array} suits in the deck.
   */
  set suits(value) {
    this._suits = value;
  }

  /**
   * Get the array of ranks.
   * @return {array} ranks as strings.
   */
  get ranks() {
    return this._ranks;
  }

  /**
   * Set the ranks value.
   * @param {array} ranks of cards in the deck.
   */
  set ranks(value) {
    this._ranks = value;
  }

  /**
   * Get the array of cards in the deck.
   * @return {array} cards as objects.
   */
  get cards() {
    return this._cards;
  }

  /**
   * Set the cards in the deck
   * @param {array} card objects in the deck
   */
  set cards(value) {
    this._cards = value;
  }

  /**
   * Get the array of delt cards from the original deck.
   * @return {array} cards as objects.
   */
  get deltCards() {
    return this._deltCards;
  }

  /**
   * Set the deltCards in the deck
   * @param {array} delt card from the original deck
   */
  set deltCards(value) {
    this._deltCards = value;
  }

  /**
   * Generate the deck of cards from the suits and ranks specificed
   * @return {Array} array of card ojbects in suit rank order.
   */
  generateDeck() {
    const cards = [];
    let position = 0;

    // map through the suits and ranks to generate the deck of cards
    this.suits.map((suit) => {
      this.ranks.map((rank, i) => cards.push({
        suit,
        rank,
        order: i,
        position: position++,
      }));

      return true;
    });

    // if specified, include the pojects into the deck
    if (!this.excludeJokers) {
      cards.push({ joker: true, position: position++ });
      cards.push({ joker: true, position: position++ });
    }

    this.cards = cards;
  }

  /**
   * Shuffle the cards in the deck.
   *
   * Note: This is an implementation of the Fisher-Yates shuffle algorithm
   * described here https://bost.ocks.org/mike/shuffle/
   */
  shuffle() {
    let totalCards = this.cards.length;
    const cardsToShuffle = this.cards;

    let currentCard;
    let selectedCard;

    let positionCount = 0;

    try {
      // While we still have cards to shuffle
      while (totalCards) {
        // Pick un unshuffled card from the deck at random
        selectedCard = Math.floor(Math.random() * totalCards--);

        // get the card at the current position
        currentCard = cardsToShuffle[totalCards];

        // working backwards, set the card in the current position
        // to be the randomly selected card.
        cardsToShuffle[totalCards] = cardsToShuffle[selectedCard];

        // put the selected card into the positon of the current card
        cardsToShuffle[selectedCard] = currentCard;

        // update the position reference in the card object
        cardsToShuffle[selectedCard].position = positionCount++;
      }

      // update the deck with the newly shuffled cards
      this.cards = cardsToShuffle;
    } catch (error) {
      throw new Error('An error occured while shuffling', error);
    }
  }

  /**
   * Deal one card off the top of the deck and track it in deltCards
   * @return {Object} the delt card off the top of the deck
   */
  dealOne() {
    try {
      // remove the first card from the cards array
      const cardToDeal = this.cards.shift();

      // append the delt card to the delt card pile
      this.deltCards.push(cardToDeal);

      return cardToDeal;
    } catch (error) {
      throw new Error('An error occured while dealing', error);
    }
  }
}

module.exports = Deck;
