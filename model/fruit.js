// fruit constructor
// A fruit is an object with an array of coordinate pairs, a pointValue,
// and a remainingLifeSpan
class Fruit extends GameEntity {
  constructor(positionArray, pointValue, remainingLifeSpan) {
    super(positionArray);
    if (typeof pointValue != 'number') {
      throw new Error('pointValue must be a number');
    } else if (typeof remainingLifeSpan != 'number') {
      throw new Error('remainingLifeSpan must be a number');
    }
    this._pointValue = pointValue;
    this._remainingLifeSpan = remainingLifeSpan;
  }
  get pointValue() {
    return this._pointValue;
  }
  get remainingLifeSpan() {
    return this._remainingLifeSpan;
  }
};
