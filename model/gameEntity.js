// game entity constructor
// A gameEntity is an object with a and an array of coordinate pairs.
class GameEntity {
  constructor( positionArray) {
    if (!Array.isArray(positionArray)) {
      throw new Error('positionArray must be set to a nested array of coordinate pairs');
    } else if (positionArray.length < 1) {
      throw new Error('positionArray must have at least one entry');
    }
    for(let i=0; i<positionArray.length; i++) {
      if(positionArray[i].length != 2) {
        throw new Error('coordinate pairs must be two elements')
      } else if (typeof positionArray[i][0] != 'number'
                 || typeof positionArray[i][1] != 'number') {
        throw new Error('coordinate pairs must be number pairs');
     }
    }
    this._positionArray = positionArray;
  }
  get positionArray() {
    return this._positionArray;
  }
};
