import { elements } from './base';
import { limitStringLength } from './limitStringLength';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

const clearSearchResults = () => {
  elements.searchResults.innerHTML = '';
};

const clearSearchButtons = () => {
  elements.resultPages.innerHTML = '';
};

export const clearSelected = () => {
  const selected = document.querySelector('.results__link--active');
  if (selected) {
    selected.classList.remove('results__link--active');
  }
};

export const highlightSelected = (id) => {
  const selected = document.querySelector(`[href="#${id}"]`);
  if (selected) {
    selected.classList.add('results__link--active');
  }
};

const displayRecipe = (recipe) => {
  const html = `
<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitStringLength(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  elements.searchResults.insertAdjacentHTML('beforeend', html);
};

const createBtn = (page, type) => {
  return `
  <button class="btn-inline results__btn--${
    type === 'prev' ? 'prev' : 'next'
  }" data-page="${type === 'prev' ? page - 1 : page + 1}">
         <i class="search__icon fas fa-caret-${
           type === 'prev' ? 'left' : 'right'
         }"></i>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>
`;
};

function displayBtn(page, length) {
  let button;
  if (page === 1) {
    button = createBtn(page, 'next');
  } else if (page < length) {
    button = `${createBtn(page, 'prev')}
    ${createBtn(page, 'next')}`;
  } else if (page === length) {
    button = createBtn(page, 'prev');
  }
  return button;
}

export const renderRecipes = (recipes, page = 1, results = 10) => {
  const start = (page - 1) * results;
  const end = start + results;
  const numPages = Math.ceil(recipes.length / results);
  clearSearchResults();
  clearSearchButtons();
  recipes.slice(start, end).forEach(displayRecipe);
  elements.resultPages.insertAdjacentHTML(
    'beforeend',
    displayBtn(page, numPages)
  );
};
