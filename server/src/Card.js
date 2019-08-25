export default class Card {
  constructor({ name, position, upgradePrice, fees, mortgage }) {
    this.name = name;
    this.position = position;
    this.upgradePrice = upgradePrice;
    this.fees = fees;
    this.mortgage = mortgage;

    this.upgrades = 0;
    this.owner = null;
  }

  set owner(player) {
    this.owner = player;
  }

  get owner() {
    return this.owner;
  }

  get fees() {
    return this.fees;
  }

  getUpgradePrice(amount) {
    return amount * this.upgradePrice;
  }

  upgrade(amount) {
    if (this.upgrades + amount > 5) {
      return false;
    }

    this.upgrades += amount;
    return true;
  }

  toJSON() {
    const { name, upgradePrice, fees, mortgage } = this;

    return { name, upgradePrice, fees, mortgage };
  }
}
