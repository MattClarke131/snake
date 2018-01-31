// snake constructor
// A snake is an object with an array of coordinate pairs, a direction,
// and a remainingGrowth property
class Snake extends GameEntity {
  constructor(id, positionArray, direction, remainingGrowth) {
    super(positionArray);
    if(typeof id != 'number') {
      throw new Error('snake requires number id');
    }
    if(['left','down','right','up'].indexOf(direction) == -1) {
      throw new Error('invalid direction');
    } else if (typeof remainingGrowth != 'number') {
      throw new Error('remainingGrowth must be a number');
    }
    this._id = id;
    this._direction = direction;
    this._remainingGrowth = remainingGrowth;
  }
  get id() {
    return this._id;
  }
  get direction() {
    return this._direction;
  }
  get remainingGrowth() {
    return this._remainingGrowth;
  }
};
