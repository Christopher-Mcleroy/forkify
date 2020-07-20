/* eslint-disable node/no-unsupported-features/es-syntax */
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};
export const clearSearch = () => {
  elements.searchResults.innerHTML = '';
  elements.resultPages.innerHTML = '';
};

function limitTitleLength(title, limit = 17) {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      const newAcc = acc + cur.length;
      return newAcc;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}

function displayRecipe(recipe) {
  const html = `
<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitTitleLength(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  elements.searchResults.insertAdjacentHTML('beforeend', html);
}

function createBtn(page, type) {
  return `
  <button class="btn-inline results__btn--${
    type === 'prev' ? 'prev' : 'next'
  }" data-page="${type === 'prev' ? page - 1 : page + 1}">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === 'prev' ? 'left' : 'right'
        }"></use>
    </svg>
    <span>Page${type === 'prev' ? page - 1 : page + 1}</span>
</button>
`;
}

function displayBtn(page, length) {
  let button;
  // if page is 1 creates only next btn
  if (page === 1) {
    button = createBtn(page, 'next');
  } // if between page one and last creates both
  else if (page < length) {
    button = `${createBtn(page, 'prev')}
    ${createBtn(page, 'next')}`;
  } // if last page only create prev page
  else if (page === length) {
    button = createBtn(page, 'prev');
  }
  return button;
}

export const renderRecipes = (recipes, page = 1, results = 10) => {
  // calc start index
  const start = (page - 1) * results;
  // calc end index
  const end = start + results;
  // calc total pages
  const numPages = Math.ceil(recipes.length / results);
  // clear search results
  clearSearch();
  // slice index of array and displays each recipe
  recipes.slice(start, end).forEach(displayRecipe);
  // create buttons
  const btnHtml = displayBtn(page, numPages);
  // insert buttons into page
  elements.resultPages.insertAdjacentHTML('beforeend', btnHtml);
};
