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

  calcRecipeTime() {
    const periods = this.selectedRecipe.recipe.ingredients.length / 3;
    this.prepTime = Math.ceil(parseInt(periods * 15));
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    let ingredient = this.selectedRecipe.recipe.ingredients;
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
    const newIngredient = ingredient.map((element) => {
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
      const unitIndex = ingredientArr.findIndex((el) =>
        shortIngredient.includes(el)
      );
      let ingObj = {};
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
          ).toFixed(2),
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
    this.selectedRecipe.recipe.ingredients = newIngredient;
  }
}
