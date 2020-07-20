/* eslint-disable node/no-unsupported-features/es-syntax */
import Search from './model/Search';
import Recipe from './model/Recipe';
import { elements, renderLoader, removeLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipe from './view/recipeView';

const state = {};

async function controlSearch(page) {
  // 1 get input from view
  const query = searchView.getInput();
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
        // 8. add event
        // eslint-disable-next-line no-use-before-define
        resultsListener();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function controlItem(ele) {
  // 1. get selected id
  const id = ele.getAttribute('href').split('#')[1];
  // 2. save in state
  state.recipe = new Recipe(id);
  // 3. render loader
  renderLoader(elements.recipe);
  // 4. get item data
  await state.recipe.getItemData();
  // 5. remove loader
  removeLoader();
  // 6. render new item
  recipe.renderRecipe(state.recipe.selectedRecipe);
}

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
  resultsListener();
});

function resultsListener() {
  // eslint-disable-next-line no-undef
  document.querySelectorAll('.results__link').forEach((ele) => {
    ele.addEventListener('click', () => controlItem(ele));
  });
}
