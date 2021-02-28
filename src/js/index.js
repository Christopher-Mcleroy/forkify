/* eslint-disable node/no-unsupported-features/es-syntax */
import Search from './model/Search';
import Recipe from './model/Recipe';
import ShoppingList from './model/ShoppingList';
import Likes from './model/Likes';
import { elements, renderLoader, removeLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipe from './view/recipeView';
import * as shoppingCartView from './view/shoppingCart';
import * as likesView from './view/likesView';
import '../scss/main.scss';

const state = {};

async function controlSearch(page) {
  const query = searchView.getInput();
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    renderLoader(elements.searchRes);
    await state.search
      .searchByName()
      .then(() => {
        removeLoader();
        searchView.renderRecipes(state.search.recipes, page);
      })
      .catch((err) => {
        throw err;
      });
  }
}

async function controlItem() {
  const id = window.location.hash.replace('#', '');
  if (id) {
    searchView.clearSelected();
    searchView.highlightSelected(id);
    state.recipe = new Recipe(id);
    renderLoader(elements.recipe);
    await state.recipe.getItemData();
    state.recipe.parseIngredients();
    removeLoader();
    state.recipe.calcRecipeTime();
    recipe.renderRecipe(state.recipe);
    if (state.likes) {
      if (state.likes.isLiked(state.recipe.id) !== -1) {
        likesView.toggleLikeBtn();
      }
    }
  }
}

const controlCart = () => {
  if (!state.list) state.list = new ShoppingList();
  state.recipe.ingredients.forEach((el) =>
    state.list.addItem(el.value, el.unit, el.ingredient)
  );
  state.list.items.forEach((el) => shoppingCartView.renderShoppingCartItem(el));
};

const controlLike = (state) => {
  if (!state.likes) state.likes = new Likes();
  const { id } = state.recipe;
  if (state.likes.isLiked(id) === -1) {
    state.likes.addLike(state.recipe);
    likesView.toggleLikeBtn();
    likesView.addLike(state.likes.likes.find((el) => el.id === id));
  } else {
    state.likes.removeLike(id);
    likesView.toggleLikeBtn();
    likesView.removeLike(id);
  }
};

window.addEventListener('load', () => {
  const id = window.location.hash.replace('#', '');
  state.likes = new Likes();
  state.likes.readStorage();
  state.likes.likes.forEach((like) => likesView.addLike(like));
});

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
    controlLike(state);
  }
});

elements.shoppingList.addEventListener('click', (e) => {
  if (e.target.matches('.shopping__btn *')) {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.list.removeItem(id);
    shoppingCartView.removeShoppingCartItem(id);
  }
});

elements.shoppingList.addEventListener('change', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if (e.target.matches('[type="number"]')) {
    const value = parseFloat(e.target.value, 10);
    state.list.updateItem(id, value);
  }
});

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.resultPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  const page = parseInt(btn.getAttribute('data-page'), 10);
  searchView.renderRecipes(state.search.recipes, page);
});

['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlItem)
);
