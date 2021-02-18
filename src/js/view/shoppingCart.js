import { elements } from './base';

export const renderShoppingCartItem = (item) => {
  const html = `
        <li class="shopping__item" data-itemID="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.value}" step=".25" min="0">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny shopping__btn">
                <i class="fas fa-trash"></i>
            </button>
        </li>`;
  elements.shoppingList.insertAdjacentHTML('beforeend', html);
};

export const removeShoppingCartItem = (id) => {
  document.querySelector(`[data-itemID="${id}"]`).remove();
};
