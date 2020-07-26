/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prettier/prettier */
import { elements } from './base';

export const renderItem = (item) => {
  const markup = `
        <li class="shopping__item" data-itemID="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.value}" step="1">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny shopping__btn">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`;
  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const removeItem = (id) => {
  const item = document.querySelector(`[data-itemID="${id}"]`);
  item.remove();
};
