export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike({ id, title, publisher, image_url }) {
    this.likes.push({ id, title, publisher, image_url });
    this.saveToStorage();
  }

  removeLike(id) {
    this.likes.splice(
      this.likes.findIndex((el) => el.id === id),
      1
    );
    this.saveToStorage();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id);
  }

  saveToStorage() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) this.likes = storage;
  }
}

//module.exports = Likes;
