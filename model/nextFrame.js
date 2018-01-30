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
