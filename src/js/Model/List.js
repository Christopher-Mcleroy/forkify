/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prettier/prettier */
import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(value, unit, ingredient) {
    const item = {
      value,
      unit,
      ingredient,
      id: uniqid(),
    };
    this.items.push(item);
    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    return this.items.splice(index, 1);
  }

  updateItem(id, newValue) {
    const index = this.items.find((el) => el.id === id);
    index.value = newValue;
    return index;
  }
}
