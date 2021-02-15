import { elements } from './base';

export const renderItem = (item) => {
  const html = `
        <li class="shopping__item" data-itemID="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.value}" step=".25">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny shopping__btn">
                <i class="fas fa-trash"></i>
            </button>
        </li>`;
  elements.shoppingList.insertAdjacentHTML('beforeend', html);
};

export const removeItem = (id) => {
  const item = document.querySelector(`[data-itemID="${id}"]`);
  item.remove();
};
