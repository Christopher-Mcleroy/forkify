import { Fraction } from 'fractional';
import { elements } from './base';

const ingredientFormated = (ingredient) => {
  return `
    <li class="recipe__item">
      <i class="recipe__icon fas fa-check"></i>
      <div class="recipe__count">${new Fraction(
        ingredient.value.toFixed('1')
      ).toString()}</div>
       <div class="recipe__ingredient">
       <span class="recipe__unit">${ingredient.unit}</span>
       ${ingredient.ingredient}
      </div>
    </li>
    `;
};

export const updateIngredients = (recipe) => {
  document.querySelectorAll('.recipe__count').forEach((recipeCount, i) => {
    recipeCount.innerText = new Fraction(
      recipe.ingredients[i].value.toFixed('1')
    ).toString();
  });
  document.querySelector('.recipe__info-data--people').innerText =
    recipe.servings;
};

export const renderRecipe = (recipe) => {
  console.log(recipe);
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
        <i class="recipe__info-icon fas fa-stopwatch"></i>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.prepTime
        }</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <i class="recipe__info-icon fas fa-male"></i>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                  <i class="fas fa-minus"></i>
            </button>
            <button class="btn-tiny btn-increase">
                <i class="fas fa-plus"></i>
            </button>
        </div>

    </div>
    <button class="recipe__love">
           <i class="header__likes far fa-heart"></i>
    </button>
</div>

<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map((ingredient) => ingredientFormated(ingredient))
          .join('')}
    </ul>

    <button class="btn-small recipe__btn">
           <i class="search__icon fas fa-cart-plus"></i>
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
        <i class="search__icon fas fa-caret-right"></i>
    </a>
</div>`;
  elements.recipe.insertAdjacentHTML('beforeend', html);
};
