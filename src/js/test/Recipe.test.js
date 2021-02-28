const Recipe = require('../model/Recipe');

describe('Recipe class tests', () => {
  const NewRecipe = new Recipe(123);

  test('Id should be 123', () => {
    expect(NewRecipe.id).toBe(123);
  });
});
