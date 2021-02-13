/* eslint-disable node/no-unsupported-features/es-syntax */
import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import Likes from './model/Likes';
import { elements, renderLoader, removeLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipe from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';
import "../scss/main.scss";

const state = {};

// ************************************************************************************************** */
// ******************************controller for search   ********************************************* */
// ************************************************************************************************** */

async function controlSearch(page) {
  // ************************************************************************************************** */
  // ******************************************testing    ********************************************* */
  // ************************************************************************************************** */
  // 1 get input from view
  const query = searchView.getInput();
  // const query = 'pizza';
  // ************************************************************************************************** */
  // ******************************************testing    ********************************************* */
  // ************************************************************************************************** */
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
    // if liked fills in like btn
    if (state.likes) {
      if (state.likes.isLiked(state.recipe.id) !== -1) {
        likesView.toggleLikeBtn();
      }
    }
  }
}

// ************************************************************************************************** */
// ******************************controller for shopping cart   ************************************* */
// ************************************************************************************************** */

const controlCart = () => {
  if (!state.list) state.list = new List();
  state.recipe.ingredients.forEach((el) =>
    state.list.addItem(el.value, el.unit, el.ingredient)
  );
  state.list.items.forEach((el) => listView.renderItem(el));
};

// ************************************************************************************************** */
// ******************************controller for like            ************************************* */
// ************************************************************************************************** */

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const id = state.recipe.id;
  if (state.likes.isLiked(id) === -1) {
    // add like
    state.likes.addLike(
      state.recipe.id,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    // toggle button
    likesView.toggleLikeBtn();
    // add to ui
    likesView.addLike(state.likes.likes.find((el) => el.id === id));
  } else {
    // remove like
    state.likes.removeLike(id);
    // toggle button
    likesView.toggleLikeBtn();
    // remove from ui
    likesView.removeLike(id);
  }
};

// ************************************************************************************************** */
// ******************************event listeners***************************************************** */
// ************************************************************************************************** */

window.addEventListener('load', () => {
  const id = window.location.hash.replace('#', '');
  // add new like
  state.likes = new Likes();
  // get likes from storage
  state.likes.readStorage();
  // render likes
  state.likes.likes.forEach((like) => likesView.addLike(like));
  // toggle like button
  if (state.likes.isLiked(id) !== -1) {
    likesView.toggleLikeBtn();
  }
});

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
    controlCart();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});

// shopping cart remove item
elements.shoppingList.addEventListener('click', (e) => {
  // remove item if remove btn is clicked
  if (e.target.matches('.shopping__btn *')) {
    // get id
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.list.removeItem(id);
    listView.removeItem(id);
  }
});

// shopping cart change item amount
elements.shoppingList.addEventListener('change', (e) => {
  // get id
  const id = e.target.closest('.shopping__item').dataset.itemid;
  // gets value and updates
  if (e.target.matches('[type="number"]')) {
    const value = parseFloat(e.target.value, 10);
    state.list.updateItem(id, value);
  }
});

// search submit event
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // render search results
  controlSearch();
});

// search page buttons
elements.resultPages.addEventListener('click', (e) => {
  // finds button
  const btn = e.target.closest('.btn-inline');
  // pulls data from button
  const page = parseInt(btn.getAttribute('data-page'), 10);
  // renders new recipes
  searchView.renderRecipes(state.search.recipes, page);
});

// event listener to load recipe
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlItem)
);

// ************************************************************************************************** */
// ******************************************testing    ********************************************* */
// ************************************************************************************************** */

// window.addEventListener('load', (e) => {
//   e.preventDefault();
//   controlSearch();
// });

// window.s = state;

// ************************************************************************************************** */
// ******************************************testing    ********************************************* */
// ************************************************************************************************** */
