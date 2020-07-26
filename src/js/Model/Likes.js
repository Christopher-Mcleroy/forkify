/* eslint-disable node/no-unsupported-features/es-syntax */
export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, publisher, img) {
    const like = {
      id,
      title,
      publisher,
      img,
    };
    this.likes.push(like);
  }

  removeLike(id) {
    const index = this.likes.findIndex(id);
    this.likes.splice(index, 1);
  }
}
