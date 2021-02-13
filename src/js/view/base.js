/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResults: document.querySelector('.results__list'),
  recipe: document.querySelector('.recipe'),
  searchRes: document.querySelector('.results'),
  resultPages: document.querySelector('.results__pages'),
  shoppingList: document.querySelector('.shopping__list'),
  like: document.querySelector('.likes__list'),
};

export const renderLoader = (parent) => {
  const html = `
  <div class="loader">
  <i class="fas fa-spinner"></i>
  </div>
 `;
  parent.insertAdjacentHTML('afterbegin', html);
};

export const removeLoader = () => {
  document.querySelector('.loader').remove();
};
