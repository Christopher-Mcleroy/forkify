import { elements } from './base';
import { limitTitleLength } from './searchView';

export const removeLike = (id) => {
  document.querySelector(`[data-id="${id}"]`).remove();
};

export const toggleLikeBtn = () => {
  const likeBtn = document.querySelector('.header__likes use');
  if (likeBtn.getAttribute('href') === 'img/icons.svg#icon-heart-outlined') {
    likeBtn.setAttribute('href', 'img/icons.svg#icon-heart');
  } else {
    likeBtn.setAttribute('href', 'img/icons.svg#icon-heart-outlined');
  }
};

export const addLike = (like) => {
  const html = `
    <li class="likes__li" data-id="${like.id}">
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitTitleLength(like.title)}</h4>
            <p class="likes__author">${like.publisher}</p>
        </div>
    </a>
    </li>`;
  elements.like.insertAdjacentHTML('beforeend', html);
};
