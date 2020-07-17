import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getData() {
    const result = await axios(
      `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
    );
    this.recipes = result.data.recipes;
  }
}
