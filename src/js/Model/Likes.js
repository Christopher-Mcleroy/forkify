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
    this.saveToStorage();
    return like;
  }

  removeLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
    this.saveToStorage();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id);
  }

  saveToStorage() {
    const likes = JSON.stringify(this.likes);
    localStorage.setItem('likes', likes);
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) this.likes = storage;
  }
}
