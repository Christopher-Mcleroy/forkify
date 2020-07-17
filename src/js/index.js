import Search from './model/Search';
import { elements } from './view/base';
import * as searchView from './view/searchView';

const state = {};

async function controlSearch() {
  //1 get input from view
  const query = searchView.getInput();
  if (query) {
    //2 create new search
    state.search = new Search(query);
    //3 clear input from view
    searchView.clearInput();
    //4. get recipes
    await state.search.getData();
    //5. display results
    searchView.renderRecipes(state.search.recipes);
  }
}

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
