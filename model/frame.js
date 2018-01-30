// frame constructor
// A frame is an object with a yMax, a xMax, a tickValue, a snakeArray,
// and a fruit array.
class Frame {
  constructor(yMax, xMax, tickValue, snakeArray, fruitArray, gameOver) {
    if (typeof yMax != 'number') {
      throw new Error('yMax must be a number');
    } else if (yMax < 2) {
      throw new Error('yMax must be at least 2');
    } else if (typeof xMax != 'number') {
      throw new Error('xMax must be a number');
    } else if (xMax <2) {
      throw new Error('xMax must be at least 2');
    } else if (typeof tickValue != 'number') {
      throw new Error('tickValue must be a number');
    } else if(tickValue < 0) {
      throw new Error('tickValue must be a nonnegative number');
    }
    for(let i=0; i<snakeArray.length; i++) {
      if(! snakeArray[i] instanceof Snake) {
        throw new Error('snakeArray must contain only snake objects');
      }
    }
    for (let i=0; i<fruitArray.length; i++) {
      if(! fruitArray[i] instanceof Fruit) {
        throw new Error('fruitArray must contain only fruit objects');
      }
    }
    if (typeof gameOver != 'boolean') {
      throw new Error('gameOver must be a boolean');
    }

    this._yMax = yMax;
    this._xMax = xMax;
    this._tickValue = tickValue;
    this._snakeArray = snakeArray;
    this._fruitArray = fruitArray;
    this._gameOver = gameOver;
  }
  get yMax() {
    return this._yMax;
  }
  get xMax() {
    return this._xMax;
  }
  get tickValue() {
    return this._tickValue;
  }
  get snakeArray() {
    return this._snakeArray;
  }
  get fruitArray() {
    return this._fruitArray;
  }
  get gameOver() {
    return this._gameOver;
  }
};
