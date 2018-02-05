"use strict"
console.log("model.js successfully loaded");

let SnakeGame = {}
SnakeGame.Model = function() {
  // Public
  let initFrame = new Frame(20, 20, 0, [new Snake(0, [[7,7],[7,8],[7,9]], 'up', 0)], [new Fruit([[5,5]], 1, 10000)], false)
  let currentFrame = initFrame;
  let frames = [initFrame];
  let contCallback = function(){};
  // Private
  return {
    // Get Methods
    getFrameArray: function() {
      return frames;
    },
    getCurrentFrame: function() {
      return currentFrame;
    },
    // Set Methods
    saveFrame: function(frame) {
      frames.push(frame);
    },
    setCurrentFrame: function(frame) {
      currentFrame = frame;
    },
    setContCallback: function(func) {
      contCallback = func;
    },
    // Game state
    resetGame: function() {
      currentFrame = initFrame;
      frames = [initFrame];
      contCallback();
    },
    tickGame: function(dirArr) {
      let next = nextFrame(currentFrame, dirArr);
      frames.push(next);
      currentFrame = next;
      contCallback();
    },
    // Debug
    printFrame: function(frame) {
      let grid = this._frameToGrid(frame);
      grid = this._flipGrid(grid);
      for (let y=0; y<grid.length; y++) {
        console.log(grid[y]);
      }
    },
    _frameToGrid: function(frame) {
      let emptyGrid = [];
      for (let x=0; x<=frame.xMax; x++) {
        emptyGrid.push([]);
        for(let y=0; y<=frame.yMax; y++) {
          emptyGrid[x].push(' ');
        }
      }
      for (let s=0; s<frame.snakeArray.length; s++) {
        let head = frame.snakeArray[s].positionArray[0];
        let hx = head[0];
        let hy = head[1];
        emptyGrid[hx][hy] = 'S';
        for(let p=1; p<frame.snakeArray[s].positionArray.length; p++) {
          let body = frame.snakeArray[s].positionArray[p];
          let bx = body[0];
          let by = body[1];
          emptyGrid[bx][by] = 'o';
        }
      }
      for (let f=0; f<frame.fruitArray.length; f++) {
        let fruit = frame.fruitArray[f].positionArray[0];
        let fx = fruit[0];
        let fy = fruit[1];
        emptyGrid[fx][fy] = '@';
      }
      return emptyGrid
    },
    _flipGrid: function(grid) {
      var flippedGrid = []
      for(var y=0; y<grid[0].length; y++) {
        flippedGrid.push([]);
        for(var x=0; x<grid.length; x++) {
          flippedGrid[y].push(grid[x][y]);
        }
      }
      return flippedGrid;
    },
  }
};
