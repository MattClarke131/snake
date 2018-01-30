// Contract: nextFrame : frame, newDirArray -> frame
// Purpose: To generate the next frame
// Examples:
// Definition:
function nextFrame(frame, newDirArray) {
}
// Tests:

// Contract: newSnakePos array, string, boolean -> array
// Purpose: create next snake position array from previous array.
function newSnakePos(posArr, direction, grow) {
  if(! Array.isArray(posArr)) {
    throw new Error('posArr must be an array');
  } else if (['left','down','right','up'].indexOf(direction) == -1) {
    throw new Error('direction must be a string and left, down, right, or up');
  } else if (typeof grow != 'boolean') {
    throw new Error('grow must be a boolean');
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
  if(!grow) {
    newPosArr.splice(newPosArr.length-1,1);
  }
  return newPosArr;
}
// Tests:
const testNewSnakePos00 = new ModelTest('newSnakePos test 00',
  [[[4,4],[4,3],[4,2]], 'down', false],
  [[4,5],[4,4],[4,3]],
  newSnakePos);
const testNewSnakePos01 = new ModelTest('newSnakePos test 01',
  [[[4,2],[4,3],[4,4]], 'up', false],
  [[4,1],[4,2],[4,3]],
  newSnakePos);
const testNewSnakePos02 = new ModelTest('newSnakePos test 02',
  [[[4,4],[4,3],[4,2]], 'left', false],
  [[3,4],[4,4],[4,3]],
  newSnakePos);
const testNewSnakePos03 = new ModelTest('newSnakePos test 03',
  [[[4,4],[4,3],[4,2]], 'right', false],
  [[5,4],[4,4],[4,3]],
  newSnakePos);
const testNewSnakePos04 = new ModelTest('newSnakePos test 04',
  [[[4,4],[4,3],[4,2]], 'up', false],
  [[4,5],[4,4],[4,3]],
  newSnakePos);
const testNewSnakePos05 = new ModelTest('newSnakePos test 05',
  [[[4,4],[4,3],[4,2]], 'left', true],
  [[3,4],[4,4],[4,3],[4,2]],
  newSnakePos);
modelTestArr.push(testNewSnakePos00, testNewSnakePos01, testNewSnakePos02,
  testNewSnakePos03, testNewSnakePos04, testNewSnakePos05);
