import Search from './model/Search';
import { elements } from './view/base';

const state = {};

async function controlSearch() {
  //1 get input from view
  const query = 'pizza';
  if (query) {
    //2 create new search
    state.search = new Search(query);
    //3 clear input from view
    //4. get recipes
    await state.search.getData();
    //5. display results
    console.log(state.search.recipes);
  }
}

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
