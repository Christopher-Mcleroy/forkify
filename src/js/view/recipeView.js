/* eslint-disable node/no-unsupported-features/es-syntax */
import { Fraction } from 'fractional';
import { elements } from './base';

const ingredientFormated = (ele) => {
  return `
    <li class="recipe__item">
    <svg class="recipe__icon">
    <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${new Fraction(
      ele.value.toFixed('1')
    ).toString()}</div>
    <div class="recipe__ingredient">
    <span class="recipe__unit">${ele.unit}</span>
    ${ele.ingredient}
    </div>
    </li>
    `;
};
export const updateIngredients = (r) => {
  document.querySelectorAll('.recipe__count').forEach((el, i) => {
    el.innerText = new Fraction(r.ingredients[i].value.toFixed('1')).toString();
  });
  document.querySelector('.recipe__info-data--people').innerText = r.servings;
};

// eslint-disable-next-line import/prefer-default-export
export const renderRecipe = (recipe) => {
  elements.recipe.innerHTML = '';
  const html = `
<figure class="recipe__fig">
    <img src="${recipe.image_url}" alt="Tomato" class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.prepTime
        }</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart-outlined"></use>
        </svg>
    </button>
</div>

<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map((el) => ingredientFormated(el)).join('')}
    </ul>

    <button class="btn-small recipe__btn">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>

<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${
          recipe.publisher
        }</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${
      recipe.source_url
    }" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </a>
</div>`;
  elements.recipe.insertAdjacentHTML('beforeend', html);
};
