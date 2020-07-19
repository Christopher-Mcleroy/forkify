/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResults: document.querySelector('.results__list'),
  recipe: document.querySelector('.recipe'),
  searchRes: document.querySelector('.results'),
  resultPages: document.querySelector('.results__pages'),
};

export const renderLoader = (parent) => {
  const html = `
  <div class="loader">
  <svg>
  <use
  href="img/icons.svg#icon-cw">
  </use>
  </svg>
  </div>
 `;
  parent.insertAdjacentHTML('afterbegin', html);
};

export const removeLoader = () => {
  document.querySelector('.loader').remove();
};
