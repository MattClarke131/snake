// Contract: nextFrame : frame, newDirArray -> frame
// Purpose: To generate the next frame
// Examples:
// Definition:
function nextFrame(frame, newDirArray) {
}
// Tests:


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
  let newSnake = new Snake(newPos, newDir, newGrowth);
  return newSnake;
}
// Tests:
const testNextSnake00 = new ModelTest('nextSnake test 00',
  [new Snake([[1,2],[1,3],[1,4]], 'down', 0), 'down', 0],
  new Snake([[1,1],[1,2],[1,3]], 'down', 0),
  nextSnake);
const testNextSnake01 = new ModelTest('nextSnake test 01',
  [new Snake([[1,2],[1,3],[1,4]], 'down', 0), 'right', 0],
  new Snake([[2,2],[1,2],[1,3]], 'right', 0),
  nextSnake);
const testNextSnake02 = new ModelTest('nextSnake test 02',
  [new Snake([[1,4],[1,3],[1,2]], 'up', 0), 'up', 1],
  new Snake([[1,5],[1,4],[1,3],[1,2]], 'up', 0),
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
