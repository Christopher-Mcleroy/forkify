const Likes = require('../model/Likes');

describe('Testing Like class', () => {
  const like = new Likes();
  const newLike = {
    id: 123,
    title: 'chicken pasta',
    publisher: 'mom',
    image_url: 'none',
  };

  test('addLike to increase likes', () => {
    like.addLike(newLike);
    expect(like.likes.length).toBe(1);
    expect(like.likes[0].id).toBe(123);
  });

  test('isLike to be 0 or greater', () => {
    expect(like.isLiked(123)).toBeGreaterThanOrEqual(0);
  });

  test('removeLike should remove like', () => {
    like.removeLike(123);
    expect(like.likes.length).toBe(0);
  });

  test('isLike to be -1', () => {
    expect(like.isLiked(123)).toBe(-1);
  });
});
