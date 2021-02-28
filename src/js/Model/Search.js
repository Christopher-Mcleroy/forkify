import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async searchByName() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      this.recipes = result.data.recipes;
    } catch (error) {
      console.log(error);
    }
  }

  async searchById() {
    return await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${this.query}`
    );
  }
}
