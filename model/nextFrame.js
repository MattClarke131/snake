// Contract: nextFrame : frame, newDirArray -> frame
// Purpose: To generate the next frame
// Examples:
// Definition:
function nextFrame(frame, newDirArray) {
}
// Tests:

// Contract:_filterFrameCollisions: frame -> frame
// Purpose: To apply collision game logic to a frame
// Definition:
function _filterFrameCollisions(frame) {
  let newSnakeArray = frame.snakeArray;
  let newFruitArray = frame.fruitArray;
  newSnakeArray = _filterSnakeCollision(newSnakeArray);
  newSnakeArray = newSnakeArray.filter(e => !_selfCollision(e));
  newSnakeArray = newSnakeArray.filter(e => !_wallCollision(e,frame.xMax,frame.yMax));
  newSnakeArray = _filterSnakeFruitArrays(newSnakeArray, newFruitArray)[0];
  newFruitArray = _filterSnakeFruitArrays(newSnakeArray, newFruitArray)[1];
  let xMax = frame.xMax;
  let yMax = frame.yMax;
  let tickValue = frame.tickValue;
  let gameOver = frame.gameOver;
  let newFrame = new Frame(xMax, yMax, tickValue, newSnakeArray, newFruitArray, gameOver);
  return newFrame
}
// Tests:
const testFilterFrameCollisions00 = new ModelTest('_filterFrameCollisions test 00',
  [new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 0)], [new Fruit([[4,4]], 1, 100)], false)],
  new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 0)], [new Fruit([[4,4]], 1, 100)], false),
 _filterFrameCollisions);
const testFilterFrameCollisions01 = new ModelTest('_filterFrameCollisions test 01',
  [new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 0)], [new Fruit([[1,2]], 1, 100)], false)],
  new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 1)], [], false),
 _filterFrameCollisions);
const testFilterFrameCollisions02 = new ModelTest('_filterFrameCollisions test 02',
  [new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[2,1],[1,1],[1,2]], 'left', 0)], [new Fruit([[4,4]], 1, 100)], false)],
  new Frame(9, 9, 1, [], [new Fruit([[4,4]], 1, 100)], false),
 _filterFrameCollisions);
const testFilterFrameCollisions03 = new ModelTest('_filterFrameCollisions test 03',
  [new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 0), new Snake(1, [[0,-1],[0,0],[0,1]], 'up', 0)], [new Fruit([[4,4]], 1, 100)], false)],
  new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 0)], [new Fruit([[4,4]], 1, 100)], false),
 _filterFrameCollisions);
const testFilterFrameCollisions04 = new ModelTest('_filterFrameCollisions test 04',
  [new Frame(9, 9, 1, [new Snake(0, [[10,2],[9,2],[8,2]], 'right', 0), new Snake(1, [[0,-1],[0,0],[0,1]], 'up', 0)], [new Fruit([[4,4]], 1, 100)], false)],
  new Frame(9, 9, 1, [], [new Fruit([[4,4]], 1, 100)], false),
 _filterFrameCollisions);
const testFilterFrameCollisions05 = new ModelTest('_filterFrameCollisions test 05',
  [new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 0), new Snake(1, [[1,0],[0,0],[0,1]], 'right', 0)],
    [new Fruit([[1,2]], 1, 100), new Fruit([[1,0]], 1, 100)], false)],
  new Frame(9, 9, 1, [new Snake(0, [[1,2],[2,2],[3,2]], 'left', 1), new Snake(1, [[1,0],[0,0],[0,1]], 'right', 1)],
    [], false),
 _filterFrameCollisions);
modelTestArr.push(testFilterFrameCollisions00, testFilterFrameCollisions01,
  testFilterFrameCollisions02, testFilterFrameCollisions03,
  testFilterFrameCollisions04, testFilterFrameCollisions05);

// Contract: _filterSnakeCollision: snakeArray -> snakeArray
// Purpose: Remove all snakes that are colliding with other snakes from an array.
function _filterSnakeCollision(snakeArray) {
  let newSnakeArray = [];
  for (let i=0; i<snakeArray.length; i++) {
    let snakeLives = true;
    for(j=0; j<snakeArray.length; j++) {
      if(i!=j && _snakeCollision(snakeArray[i],snakeArray[j])) {
        snakeLives = false;
      }
    }
    if(snakeLives){
      newSnakeArray.push(snakeArray[i]);
    }
  }
  return newSnakeArray;
}
// Tests:
const testFilterSnakeCollision00 = new ModelTest('_filterSnakeCollision test 00',
  [[new Snake(0, [[1,1],[1,2],[1,3]], 'up', 0), new Snake(1, [[5,5],[5,4],[5,3]], 'down', 0)]],
  [new Snake(0, [[1,1],[1,2],[1,3]], 'up', 0), new Snake(1, [[5,5],[5,4],[5,3]], 'down', 0)],
  _filterSnakeCollision);
const testFilterSnakeCollision01 = new ModelTest('_filterSnakeCollision test 01',
  [[new Snake(0, [[1,1],[1,2],[1,3]], 'up', 0), new Snake(1, [[1,3],[2,3],[3,3]], 'left', 0)]],
  [new Snake(0, [[1,1],[1,2],[1,3]], 'up', 0)],
  _filterSnakeCollision);
const testFilterSnakeCollision02 = new ModelTest('_filterSnakeCollision test 02',
  [[new Snake(0, [[2,3],[2,2],[1,2],[1,3]], 'up', 0), new Snake(1, [[1,3],[2,3],[3,3]], 'left', 0)]],
  [],
  _filterSnakeCollision);
const testFilterSnakeCollision03 = new ModelTest('_filterSnakeCollision test 03',
  [[new Snake(0, [[0,0],[1,0],[2,0],[2,1]], 'left', 0),
    new Snake(1, [[2,1],[2,2],[1,2],[1,1]], 'up', 0),
    new Snake(2, [[1,1],[0,1],[0,0]], 'right', 0)]],
  [],
  _filterSnakeCollision);
modelTestArr.push(testFilterSnakeCollision00, testFilterSnakeCollision01,
  testFilterSnakeCollision02, testFilterSnakeCollision03);

// Contract: _snakeCollision: snake, snake -> boolean
function _snakeCollision(colliderSnake, collideeSnake) {
  let head = colliderSnake.positionArray[0];
  let snakeCoords = collideeSnake.positionArray;
  return _isInCoordArray(head, snakeCoords);
}
// Tests
const testSnakeCollision00 = new ModelTest('_snakeCollision test 00',
  [new Snake(0, [[2,2],[2,1],[2,0]],'up', 0), new Snake(1, [[4,2],[3,2],[2,2]],'right', 0)],
  true,
  _snakeCollision);
const testSnakeCollision01 = new ModelTest('_snakeCollision test 01',
  [new Snake(0, [[2,2],[2,1],[2,0]],'up', 0), new Snake(1, [[7,5],[6,5],[5,5]],'right', 0)],
  false,
  _snakeCollision);
modelTestArr.push(testSnakeCollision00, testSnakeCollision01);

// Contract _selfCollision: snake -> boolean
// Purpose: determine if a snake has collided with itself
// Definition:
function _selfCollision(snake) {
  let head = snake.positionArray[0];
  let body = snake.positionArray.slice(1);
  return _isInCoordArray(head, body);
}
// Tests:
const testSelfCollision00 = new ModelTest('_selfCollision test 00',
  [new Snake(0, [[0,2],[0,1],[0,0],[1,0],[2,0]],'down', 0)],
  false,
  _selfCollision);
const testSelfCollision01 = new ModelTest('_selfCollision test 01',
  [new Snake(0, [[3,3],[2,3],[1,3],[1,2],[2,2],[3,2],[3,3],[3,4]],'down', 0)],
  true,
  _selfCollision);
modelTestArr.push(testSelfCollision00, testSelfCollision01);

// Contract: _wallCollision: snake, number, number -> boolean
function _wallCollision(snake, xMax, yMax) {
  if(! snake instanceof Snake) {
    throw new Error('_wallCollision: first arg must be snake object');
  } else if(typeof xMax != 'number' || typeof yMax != 'number') {
    throw new Error('_wallCollision: xMax, and yMax must be numbers');
  }
  let head = snake.positionArray[0];
  if(head[0] < 0 || head[0] > xMax) {
    return true;
  } else if (head[1] < 0 || head[1] > yMax) {
    return true;
  } else {
    return false;
  }
}
// Tests
const testWallCollision00 = new ModelTest('_wallCollision test 00',
  [new Snake(0, [[-1,0],[0,0],[1,0]], 'left', 0), 9, 9],
  true,
  _wallCollision);
const testWallCollision01 = new ModelTest('_wallCollision test 01',
  [new Snake(0, [[9,9],[9,8],[9,7]], 'down', 0), 9, 9],
  false,
  _wallCollision);
modelTestArr.push(testWallCollision00, testWallCollision01);

// Contract _filterSnakeFruitArrays: snakeArray, fruitArray -> array
function _filterSnakeFruitArrays(snakeArray, fruitArray) {
  let newFruitArray = [];
  let newSnakeArray = [];
  for (let i=0; i<snakeArray.length; i++) {
    newSnakeArray.push(snakeArray[i]);
  }
  for (let i=0; i<fruitArray.length; i++) {
    let uneaten = true;
    for (let j=0; j<snakeArray.length; j++) {
      if (_fruitCollision(snakeArray[j], fruitArray[i])) {
        uneaten = false;
        let currentSnake = snakeArray[j];
        let currentFruitValue = fruitArray[i].pointValue;
        let newGrowth = currentSnake.remainingGrowth + currentFruitValue;
        let newSnake = new Snake(currentSnake.id, currentSnake.positionArray, currentSnake.direction, newGrowth);
        newSnakeArray[j] = newSnake;
      }
    }
    if(uneaten) {
      newFruitArray.push(fruitArray[i]);
    }
  }
  return [newSnakeArray, newFruitArray];
}
// Tests
const testFilterSnakeFruitArrays00 = new ModelTest('_filterSnakeFruitArrays test 00',
  [[new Snake(0, [[0,0]], 'up', 0)],[new Fruit([[0,0]], 1, 100)]],
  [[new Snake(0, [[0,0]], 'up', 1)],[]],
  _filterSnakeFruitArrays);
const testFilterSnakeFruitArrays01 = new ModelTest('_filterSnakeFruitArrays test 01',
  [[new Snake(0, [[0,0]], 'up', 0)],[new Fruit([[1,1]], 1, 100)]],
  [[new Snake(0, [[0,0]], 'up', 0)],[new Fruit([[1,1]], 1, 100)]],
  _filterSnakeFruitArrays);
const testFilterSnakeFruitArrays02 = new ModelTest('_filterSnakeFruitArrays test 02',
  [[new Snake(0, [[0,0]], 'up', 0), new Snake(1, [[4,4]], 'left', 2)],
    [new Fruit([[0,0]], 1, 100), new Fruit([[4,4]], 1, 100)]],
  [[new Snake(0, [[0,0]], 'up', 1), new Snake(1, [[4,4]], 'left', 3)],[]],
  _filterSnakeFruitArrays);
const testFilterSnakeFruitArrays03 = new ModelTest('_filterSnakeFruitArrays test 03',
  [[new Snake(0, [[0,0]], 'up', 0)],[new Fruit([[0,0]], 5, 100)]],
  [[new Snake(0, [[0,0]], 'up', 5)],[]],
  _filterSnakeFruitArrays);
modelTestArr.push(testFilterSnakeFruitArrays00, testFilterSnakeFruitArrays01,
  testFilterSnakeFruitArrays02, testFilterSnakeFruitArrays03);

//Contract: _fruitCollision: snake, fruit -> boolean
function _fruitCollision(snake, fruit) {
  let head = snake.positionArray[0];
  let fruitCoords = fruit.positionArray;
  return _isInCoordArray(head, fruitCoords);
}
// Tests
const testFruitCollision00 = new ModelTest('_fruitCollision test 00',
  [new Snake(0, [[3,3],[4,3],[5,3]], 'left', 0), new Fruit([[3,3]], 1, 100),],
  true,
  _fruitCollision);
const testFruitCollision01 = new ModelTest('_fruitCollision test 01',
    [new Snake(0, [[3,3],[4,3],[5,3]], 'left', 0), new Fruit([[4,4]], 1, 100),],
  false,
  _fruitCollision);
modelTestArr.push(testFruitCollision00, testFruitCollision01);

// Contract: nextSnake: snake, newDir, addGrowth -> snake
// Purpose: To generate the next snake given an old snake, a new direction,
// and a new amount to grow.
// Examples:
// Definition:
function nextSnake(snake, newDir, addGrowth) {
  let newGrowth = snake.remainingGrowth + addGrowth;
  let newPos = newSnakePos(snake.positionArray, newDir, newGrowth);
  if(newGrowth > 0) {
    newGrowth -= 1;
  }
  let newSnake = new Snake(snake.id, newPos, newDir, newGrowth);
  return newSnake;
}
// Tests:
const testNextSnake00 = new ModelTest('nextSnake test 00',
  [new Snake(0, [[1,2],[1,3],[1,4]], 'down', 0), 'down', 0],
  new Snake(0, [[1,1],[1,2],[1,3]], 'down', 0),
  nextSnake);
const testNextSnake01 = new ModelTest('nextSnake test 01',
  [new Snake(0, [[1,2],[1,3],[1,4]], 'down', 0), 'right', 0],
  new Snake(0, [[2,2],[1,2],[1,3]], 'right', 0),
  nextSnake);
const testNextSnake02 = new ModelTest('nextSnake test 02',
  [new Snake(0, [[1,4],[1,3],[1,2]], 'up', 0), 'up', 1],
  new Snake(0, [[1,5],[1,4],[1,3],[1,2]], 'up', 0),
  nextSnake);
modelTestArr.push(testNextSnake00, testNextSnake01, testNextSnake02);

// Contract: newSnakePos array, string, number -> array
// Purpose: create next snake position array from previous array.
function newSnakePos(posArr, direction, grow) {
  if(! Array.isArray(posArr)) {
    throw new Error('posArr must be an array');
  } else if (['left','down','right','up'].indexOf(direction) == -1) {
    throw new Error('direction must be a string and left, down, right, or up');
  } else if (typeof grow != 'number') {
    throw new Error('grow must be a number');
  }
  let head;
  switch(direction) {
    case 'up':
      head = [posArr[0][0],posArr[0][1]-1];
      break;
    case 'down':
      head = [posArr[0][0],posArr[0][1]+1];
      break;
    case 'left':
      head = [posArr[0][0]-1,posArr[0][1]];
      break;
    case 'right':
      head = [posArr[0][0]+1,posArr[0][1]];
      break;
    default:
      break;
  }
  if (head[0] == posArr[1][0] && head[1] == posArr[1][1]) {
    let newX = 2 * posArr[0][0] - posArr[1][0];
    let newY = 2 * posArr[0][1] - posArr[1][1];
    head = [newX, newY];
  }
  let newPosArr = [head].concat(posArr);
  if(grow < 1) {
    newPosArr.splice(newPosArr.length-1,1);
  }
  return newPosArr;
}
// Tests:
const testNewSnakePos00 = new ModelTest('newSnakePos test 00',
  [[[4,4], [4,3], [4,2]], 'down', 0],
  [[4,5], [4,4], [4,3]],
  newSnakePos);
const testNewSnakePos01 = new ModelTest('newSnakePos test 01',
  [[[4,2], [4,3], [4,4]], 'up', 0],
  [[4,1], [4,2], [4,3]],
  newSnakePos);
const testNewSnakePos02 = new ModelTest('newSnakePos test 02',
  [[[4,4], [4,3], [4,2]], 'left', 0],
  [[3,4], [4,4], [4,3]],
  newSnakePos);
const testNewSnakePos03 = new ModelTest('newSnakePos test 03',
  [[[4,4], [4,3], [4,2]], 'right', 0],
  [[5,4], [4,4], [4,3]],
  newSnakePos);
const testNewSnakePos04 = new ModelTest('newSnakePos test 04',
  [[[4,4], [4,3], [4,2]], 'up', 0],
  [[4,5], [4,4], [4,3]],
  newSnakePos);
const testNewSnakePos05 = new ModelTest('newSnakePos test 05',
  [[[4,4], [4,3], [4,2]], 'left', 1],
  [[3,4], [4,4], [4,3], [4,2]],
  newSnakePos);
const testNewSnakePos06 = new ModelTest('newSnakePos test 06',
  [[[3,3], [3,4], [2,4], [2,3], [2,2]], 'left', 0],
  [[2,3], [3,3], [3,4], [2,4], [2,3]],
  newSnakePos);
modelTestArr.push(testNewSnakePos00, testNewSnakePos01, testNewSnakePos02,
  testNewSnakePos03, testNewSnakePos04, testNewSnakePos05, testNewSnakePos06);

// Contract: ageFruitArray: fruitArray -> fruitArray
// Purpose: Create next fruitArray from existing fruitArray
// Definition:
function ageFruitArray(fruitArray) {
  let newFruitArray = [];
  for(let i=0; i<fruitArray.length; i++) {
    let oldFruit = fruitArray[i];
    let newLifeSpan = oldFruit.remainingLifeSpan - 1;
    let pointValue = oldFruit.pointValue;
    let posArr = oldFruit.positionArray;
    if(newLifeSpan != 0) {
      newFruitArray.push(new Fruit(posArr,pointValue,newLifeSpan));
    }
  }
  return newFruitArray;
}
// Tests:
const testAgeFruitArray00 = new ModelTest('ageFruitArray test 00',
  [[new Fruit([[1,1]], 1, 20)]],
  [new Fruit([[1,1]], 1, 19)],
  ageFruitArray);
const testAgeFruitArray01 = new ModelTest('ageFruitArray test 01',
  [[new Fruit([[1,1]], 1, 20), new Fruit([[2,2]], 2, 10)]],
  [new Fruit([[1,1]], 1, 19), new Fruit([[2,2]], 2, 9)],
  ageFruitArray);
const testAgeFruitArray02 = new ModelTest('ageFruitArray test 02',
  [[new Fruit([[1,1]], 1, 1)]],
  [],
  ageFruitArray);
const testAgeFruitArray03 = new ModelTest('ageFruitArray test 03',
  [[new Fruit([[1,1]], 1, 1), new Fruit([[3,3]], 2, 5)]],
  [new Fruit([[3,3]], 2, 4)],
  ageFruitArray);
modelTestArr.push(testAgeFruitArray00, testAgeFruitArray01,
  testAgeFruitArray02, testAgeFruitArray03);

// Contract: newFruit: fullArray, height, width, pointValue, newLifeSpan -> fruit
// Purpose: To generate a new fruit on an empty board. New fruits will be on
// empty coordinates
// Examples: newFruit([[1,2],[1,3],[2,3],[3,3]]) = fruit
// Definition:
function createUnblockedFruit(fullArray, xMax, yMax, pointValue, newLifeSpan) {
  if(Array.isArray(fullArray) == false) {
    throw new Error('createUnblockedFruit: fullArray must be an array');
  } else if (typeof xMax != 'number' || typeof yMax != 'number') {
    throw new Error('creatUnblockedFruit: xMax and ymax must be numbers');
  } else if (typeof pointValue != 'number') {
    throw new Error('createUnblockedFruit: pointValue must be a number');
  } else if (typeof newLifeSpan != 'number') {
    throw new Error('createUnblockedFruit: newLifeSpan must be a number');
  }
  let newCoordPair = [_findOpenCoord(fullArray, xMax, yMax)];
  let newFruit = new Fruit(newCoordPair, pointValue, newLifeSpan);
  return newFruit;
}
// Tests:
const testCreateUnblockedFruit00 = new ModelTest('createUnblockedFruit test 00',
  [[[0,0],[0,1],[0,2],[2,2]], 2, 2, 1, 20],
  true,
  function(a,b,c,d,e) {return createUnblockedFruit(a,b,c,d,e) instanceof Fruit});
const testCreateUnblockedFruit01 = new ModelTest('createUnblockedFruit test 01',
  [[[0,0],[0,1],[0,2],[2,2]], 2, 2, 1, 20],
  true,
  function(a,b,c,d,e) {return createUnblockedFruit(a,b,c,d,e).pointValue == d});
const testCreateUnblockedFruit02 = new ModelTest('createUnblockedFruit test 02',
  [[[0,0],[0,1],[0,2],[2,2]], 2, 2, 1, 20],
  true,
  function(a,b,c,d,e) {return createUnblockedFruit(a,b,c,d,e).remainingLifeSpan == e});
modelTestArr.push(testCreateUnblockedFruit00, testCreateUnblockedFruit01,
  testCreateUnblockedFruit02);

// Contract: findOpenCoord: fullArray, xMax, yMax -> coordPair
// Purpose: To pick a random coordinate given an array of unnacceptable coordinates
// Definition:
function _findOpenCoord(fullArray, xMax, yMax) {
  if(Array.isArray(fullArray) == false) {
    throw new Error('_findOpenCoord: fullArray must be an array of coordinates');
  } else if(typeof xMax != 'number' || typeof yMax != 'number') {
    throw new Error('_findOpenCoord: xMax and yMax must be numbers')
  }
  let openCoordArr = [];
  for(let x=0; x<=xMax; x++) {
    for(let y=0; y<=yMax; y++) {
      if(! _isInCoordArray([x,y],fullArray)) {
        openCoordArr.push([x,y]);
      }
    }
  }
  if (openCoordArr.length == 0) {
    throw new Error('board is completely full!');
  }
  let randomIndex = Math.floor(Math.random() * openCoordArr.length)
  return openCoordArr[randomIndex];
}

// Contract: _isInCoordArray: coordinate pair, coordinate array -> boolean
// Purpose: To test if a coordinate is in a coordinate array
function _isInCoordArray(coord, coordArr) {
  for(let i=0; i<coordArr.length; i++) {
    if(coord[0] == coordArr[i][0] && coord[1] == coordArr[i][1]) {
      return true;
    }
  }
  return false;
}
// Tests:
const testIsInCoordArray00 = new ModelTest('_isInCoordArray test 00',
  [[1,2],[[1,1],[1,2],[1,3]]],
  true,
  _isInCoordArray);
const testIsInCoordArray01 = new ModelTest('_isInCoordArray test 01',
  [[3,3],[[1,1],[1,2],[1,3]]],
  false,
  _isInCoordArray);
modelTestArr.push(testIsInCoordArray00, testIsInCoordArray01);
