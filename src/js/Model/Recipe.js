import Search from './Search';

export default class Recipe {
  constructor(id) {
    this.id = id;
    this.servings = 4;
  }

  async getItemData() {
    const result = await new Search(this.id).searchById();
    this.recipe = result.data.recipe;
    this.image_url = this.recipe.image_url;
    this.ingredients = this.recipe.ingredients;
    this.publisher = this.recipe.publisher;
    this.publisher_url = this.recipe.publisher_url;
    this.source_url = this.recipe.source_url;
    this.title = this.recipe.title;
  }

  calcRecipeTime() {
    const periods = this.ingredients.length / 3;
    this.prepTime = Math.ceil(parseInt(periods * 15, 10));
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
      ing = ing.replace(',', '').split(' ');
      const unitIndex = ing.findIndex((el) => {
        return this.shortIngredient.includes(el);
      });
      return this.formatIngredient(ing, unitIndex);
    });
    this.ingredients = newIngredients;
  }
}

Recipe.prototype.longIngredient = [
  'cups',
  'cup',
  'teaspoons',
  'teaspoon',
  'tablespoons',
  'tablespoon',
  'ounces',
  'ounces',
];

Recipe.prototype.shortIngredient = [
  'cup',
  'cup',
  'tsp',
  'tsp',
  'tbsp',
  'tbsp',
  'oz',
  'oz',
];

//module.exports = Recipe;
