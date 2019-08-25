import Card from "./Card";

class Player {
  constructor({id, name, startMoney}) {
    this.id = id;
    this.money = startMoney;
    this.name = name;
    
    this.cards = []
    this.position = 0; 

    this.isReady = false;
  }

  /** set position of player */
  set position(position) {
    this.position = position;
  }

  /** add/remove money from player  */
  transaction(money) {
    this.money = this.money + money;
  }

  /** add card to player */
  addCard(card) {
    this.cards.append(card);
  }

  /** remove a card from player */
  removeCard(card) {
    this.cards.filter(item => item !== card)
  }

  toJSON() {
    const { id, money, name, cards, position, isReady } = this;

    return { id, money, name, cards, position, isReady };
  }
}