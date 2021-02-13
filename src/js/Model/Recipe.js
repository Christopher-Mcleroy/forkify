import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getItemData() {
    const result = await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
    );
    this.recipe = result.data.recipe;
    this.image_url = result.data.recipe.image_url;
    this.ingredients = result.data.recipe.ingredients;
    this.publisher = result.data.recipe.publisher;
    this.publisher_url = result.data.recipe.publisher_url;
    this.source_url = result.data.recipe.source_url;
    this.title = result.data.recipe.title;
  }

  calcRecipeTime() {
    const periods = this.ingredients.length / 3;
    this.prepTime = Math.ceil(parseInt(periods * 15, 10));
  }

  calcServings() {
    this.servings = 4;
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    this.ingredients.map((ing) => {
      return (ing.value *= newServings / this.servings);
    });

    this.servings = newServings;
  }

  parseIngredients() {
    const { ingredients } = this;
    const longIngredient = [
      'cups',
      'cup',
      'teaspoons',
      'teaspoon',
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounces',
    ];
    const shortIngredient = [
      'cup',
      'cup',
      'tsp',
      'tsp',
      'tbsp',
      'tbsp',
      'oz',
      'oz',
    ];
    // loop array

    // loop long ingredients
    const newIngredient = ingredients.map((element) => {
      // lowercase ingredients
      let ingredient = element.toLowerCase();
      // loop long ingredients
      longIngredient.forEach((el, ind) => {
        // replace long ingredient found with short
        ingredient = ingredient.replace(el, shortIngredient[ind]);
      });
      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      // split into count unit and ingredient
      const ingredientArr = ingredient.trim().split(' ');
      // finds unit index
      const unitIndex = ingredientArr.findIndex((el) =>
        shortIngredient.includes(el)
      );
      // creates ingredient object
      let ingObj = {};
      // assigns values unit and ingredient to ingObj
      if (unitIndex === 0) {
        ingObj = {
          value: 1,
          unit: ingredientArr[unitIndex],
          ingredient: ingredientArr.slice(unitIndex).join(' '),
        };
      } else if (unitIndex > -1) {
        ingObj = {
          value: eval(
            ingredientArr.slice(0, unitIndex).join('+').replace('-', '+')
          ),
          unit: ingredientArr[unitIndex],
          ingredient: ingredientArr.slice(unitIndex).join(' '),
        };
      } else if (parseInt(ingredientArr[0], 10)) {
        ingObj = {
          value: parseInt(ingredientArr[0], 10),
          unit: '',
          ingredient: ingredientArr.splice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        ingObj = {
          value: 1,
          unit: '',
          ingredient,
        };
      }
      // return result
      return ingObj;
    });
    // sets new ingredients
    this.ingredients = newIngredient;
  }
}
