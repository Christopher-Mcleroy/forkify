/* eslint-disable node/no-unsupported-features/es-syntax */
import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import { elements, renderLoader, removeLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipe from './view/recipeView';
import * as listView from './view/listView';

const state = {};
// ************************************************************************************************** */
// ******************************controller for search   ********************************************* */
// ************************************************************************************************** */
async function controlSearch(page) {
  // 1 get input from view
  // const query = searchView.getInput();
  // ************************************************************************************************** */
  // ******************************************testing    ********************************************* */
  // ************************************************************************************************** */
  const query = 'pizza';
  if (query) {
    // 2 create new search
    state.search = new Search(query);
    // 3 clear input from view
    searchView.clearInput();
    // eslint-disable-next-line no-undef
    // 4. render loader
    renderLoader(elements.searchRes);
    // 5. get recipes
    await state.search
      .getData()
      .then(() => {
        // 6. remove loader
        removeLoader();
        // 7. display results
        searchView.renderRecipes(state.search.recipes, page);
        // eslint-disable-next-line no-use-before-define
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// ************************************************************************************************** */
// ******************************************testing    ********************************************* */
// ************************************************************************************************** */
window.addEventListener('load', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.resultPages.addEventListener('click', (e) => {
  // finds button
  const btn = e.target.closest('.btn-inline');
  // pulls data from button
  const page = parseInt(btn.getAttribute('data-page'), 10);
  // renders new recipes
  searchView.renderRecipes(state.search.recipes, page);
});

// ************************************************************************************************** */
// ******************************controller for items   ********************************************* */
// ************************************************************************************************** */

async function controlItem() {
  // 1. get selected id
  const id = window.location.hash.replace('#', '');
  if (id) {
    searchView.clearSelected();
    searchView.highlightSelected(id);
    // 2. save in state
    state.recipe = new Recipe(id);
    // 3. render loader
    renderLoader(elements.recipe);
    // 4. get item data
    await state.recipe.getItemData();
    // parse ingredients
    state.recipe.parseIngredients();
    // 5. remove loader
    removeLoader();
    // calc time
    state.recipe.calcRecipeTime();
    // calc servings
    state.recipe.calcServings();
    // 6. render new item
    recipe.renderRecipe(state.recipe);
  }
}

// event listener to load recipe
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlItem)
);

// event listener for  recipe
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipe.updateIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipe.updateIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn, .recipe__btn *')) {
    if (!state.list) state.list = new List();
    state.recipe.ingredients.forEach((el) =>
      state.list.addItem(el.value, el.unit, el.ingredient)
    );
    state.list.items.forEach((el) => listView.renderItem(el));
  }
});

// ************************************************************************************************** */
// ******************************controller for shopping cart   ************************************* */
// ************************************************************************************************** */

// const controlCart = () = >{}

// event listener for shopping list
elements.shoppingList.addEventListener('click', (e) => {
  // get id
  // remove item if remove btn is clicked
  if (e.target.matches('.shopping__btn *')) {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.list.removeItem(id);
    listView.removeItem(id);
  } // update item if value is changed
});

elements.shoppingList.addEventListener('change', (e) => {
  // get id
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if (e.target.matches('[type="number"]')) {
    const value = parseFloat(e.target.value, 10);
    state.list.updateItem(id, value);
  }
});
