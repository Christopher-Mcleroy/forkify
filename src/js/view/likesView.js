import { elements } from './base';
import { limitStringLength } from './limitStringLength';

export const removeLike = (id) => {
  document.querySelector(`[data-id="${id}"]`).remove();
};

export const toggleLikeBtn = () => {
  const likeBtn = document.querySelector('.header__likes');
  likeBtn.classList.toggle('fas');
  likeBtn.classList.toggle('far');
};

export const addLike = (like) => {
  console.log(like);
  const html = `
    <li class="likes__li" data-id="${like.id}">
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.image_url}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitStringLength(like.title)}</h4>
            <p class="likes__author">${like.publisher}</p>
        </div>
    </a>
    </li>`;
  elements.like.insertAdjacentHTML('beforeend', html);
};
