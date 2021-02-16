import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
    this.longIngredient = [
      'cups',
      'cup',
      'teaspoons',
      'teaspoon',
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounces',
    ];

    this.shortIngredient = [
      'cup',
      'cup',
      'tsp',
      'tsp',
      'tbsp',
      'tbsp',
      'oz',
      'oz',
    ];
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
    this.ingredients.forEach((ing) => {
      ing.value *= newServings / this.servings;
    });
    this.servings = newServings;
  }

  replaceUnit(ingredients) {
    return ingredients.map((ingredient) => {
      let newIngredient = ingredient;
      this.longIngredient.forEach((el, index) => {
        newIngredient = newIngredient
          .toLowerCase()
          .trim()
          .replace(el, this.shortIngredient[index]);
      });
      newIngredient = newIngredient.replace(/ *\([^)]*\) */g, ' ');
      return newIngredient;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  formatIngredient(ingredientArr, unitIndex) {
    let ingObj = {};
    if (unitIndex === 0) {
      ingObj = {
        value: 1,
        unit: ingredientArr[unitIndex],
        ingredient: ingredientArr.slice(unitIndex + 1).join(' '),
      };
    } else if (unitIndex > -1) {
      ingObj = {
        value: eval(
          ingredientArr.slice(0, unitIndex).join('+').replace('-', '+')
        ),
        unit: ingredientArr[unitIndex],
        ingredient: ingredientArr
          .slice(unitIndex + 1)
          .join(' ')
          .replace('1', ''),
      };
    } else if (parseInt(ingredientArr[0], 10)) {
      ingObj = {
        value: parseInt(ingredientArr[0], 10),
        unit: '',
        ingredient: ingredientArr.slice(unitIndex + 2).join(' '),
      };
      console.log(ingObj.ingredient);
    } else if (unitIndex === -1) {
      ingObj = {
        value: 1,
        unit: '',
        ingredient: ingredientArr.join(' ').replace('1', ''),
      };
    }
    // return result
    return ingObj;
  }

  parseIngredients() {
    const { ingredients } = this;
    const newIngredientsArr = this.replaceUnit(ingredients);
    const newIngredients = newIngredientsArr.map((ing) => {
      ing = ing.split(' ');
      let unitIndex = -1;
      this.shortIngredient.forEach((el, index) => {
        if (ing.includes(el)) {
          unitIndex = ing.indexOf(this.shortIngredient[index]);
        }
      });

      return this.formatIngredient(ing, unitIndex);
    });
    console.log(newIngredients);
    this.ingredients = newIngredients;
  }
}
