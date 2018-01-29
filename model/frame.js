// frame constructor
// A frame is an object with a height, a width, a tickValue, a snakeArray,
// and a fruit array.
class frame {
  constructor(height, width, tickValue, snakeArray, fruitArray) {
    if (typeof height != 'number') {
      throw new Error('height must be a number');
    } else if (height < 2) {
      throw new Error('height must be at least 2');
    } else if (typeof width != 'number') {
      throw new Error('width must be a number');
    } else if (width <2) {
      throw new Error('width must be at least 2');
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

    this._height = height;
    this._width = width;
    this._tickValue = tickValue;
    this._snakeArray = snakeArray;
    this._fruitArray = fruitArray;
  }
  get height() {
    return this._height;
  }
  get width() {
    return this._width;
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
};
