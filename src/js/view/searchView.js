import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = '');

export const renderRecipes = (recipes) => {
  elements.searchResults.innerHTML = '';
  recipes.forEach((e) => displayRecipe(e));
};
// image_url: 'http://forkify-api.herokuapp.com/images/pestoa0e7.jpg';
// publisher: 'The Pioneer Woman';
// publisher_url: 'http://thepioneerwoman.com';
// recipe_id: '47025';
// social_rank: 100;
// source_url: 'http://thepioneerwoman.com/cooking/2011/06/pasta-with-pesto-cream-sauce/';
// title: 'Pasta with Pesto Cream Sauce';

function displayRecipe(recipe) {
  const html = `<li>
                    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
  elements.searchResults.insertAdjacentHTML('beforeend', html);
}
