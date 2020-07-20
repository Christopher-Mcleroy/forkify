/* eslint-disable node/no-unsupported-features/es-syntax */
import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getItemData() {
    const result = await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
    );
    this.selectedRecipe = result.data;
  }
}
