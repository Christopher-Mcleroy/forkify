/* eslint-disable node/no-unsupported-features/es-syntax */
import { elements } from './base';

const ingredientFormated = (ele) => {
  const count = 1000;
  const unit = 'grams';
  const item = 'sugar';
  return `
    <li class="recipe__item">
    <svg class="recipe__icon">
    <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${count}</div>
    <div class="recipe__ingredient">
    <span class="recipe__unit">${unit}</span>
    ${item}
    </div>
    </li>
    `;
};

function ingredient(ele) {
  console.log(ele);
  let html = '';
  ele.forEach(() => {
    html += ingredientFormated(ele);
  });
  return html;
}

// selectedRecipe: recipe: image_url: 'http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg';
// ingredients: (17)[
//   ('1-1/3 cup Shortening (may Substitute Butter)',
//   '1-1/2 cup Sugar',
//   '1 teaspoon Orange Zest',
//   '1 teaspoon Vanilla',
//   '2 whole Eggs',
//   '8 teaspoons Whole Milk',
//   '4 cups All-purpose Flour',
//   '3 teaspoons Baking Powder',
//   '1/2 teaspoon Salt',
//   '2 jars (13 Ounces Each) Marshmallow Creme',
//   '2 packages (8 Ounces Each) Cream Cheese',
//   'Peaches',
//   'Kiwi Fruit',
//   'Blueberries',
//   'Pears',
//   'Raspberries',
//   'Other Fruit Optional')
// ];
// publisher: 'The Pioneer Woman';
// publisher_url: 'http://thepioneerwoman.com';
// recipe_id: '46956';
// social_rank: 100;
// source_url: 'http://thepioneerwoman.com/cooking/2012/01/fruit-pizza/';
// title: 'Deep Dish Fruit Pizza';

// eslint-disable-next-line import/prefer-default-export
export const renderRecipe = (recipe) => {
  elements.recipe.innerHTML = '';
  const r = recipe.recipe;
  const html = `
<figure class="recipe__fig">
    <img src="${r.image_url}" alt="Tomato" class="recipe__img">
    <h1 class="recipe__title">
        <span>${r.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">45</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">4</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny">
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
        ${ingredient(r.ingredients)}
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
          r.publisher
        }</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${r.source_url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </a>
</div>`;
  elements.recipe.insertAdjacentHTML('beforeend', html);
};
