"use strict"
console.log("controller.js loaded");
SnakeGame.Controller = function(node) {
  // private
  let view = node;
  let canvas = $('.snakeCanvas')[0];
  let context = canvas.getContext('2d');
  let pHeight = 10;
  let pWidth = 10;
  let bColor = '#DDD';
  let sHColor = '#0F0';
  let sBColor = '#5F5';
  let fColor = '#D00';
  let nextDir = {0: undefined, 1: undefined};
  // public
  return {
    // Model
    model: SnakeGame.Model(),
    // initialize
    initialize: function() {
      this.model.resetGame();
      this.renderFrame(this.model.getCurrentFrame());
      this._setModelCallBack();
    },
    _setModelCallBack: function() {
      let controller = this;
      this.model.setContCallback (function() {
        controller.renderFrame(controller.model.getCurrentFrame());
      });
    },
    // Rendering
    renderFrame(frame) {
      context.fillStyle = bColor;
      context.fillRect(0, 0, pWidth*frame.xMax, pHeight*frame.yMax);
      this._renderSnakes(frame);
      this._renderFruits(frame);
    },
    _renderSnakes(frame) {
      for (let i=0; i<frame.snakeArray.length; i++) {
        let snake = frame.snakeArray[i];
        let headX = snake.positionArray[0][0];
        let headY = snake.positionArray[0][1];
        this._renderPixel(headX, headY, sHColor);
        for (let j=1; j<snake.positionArray.length; j++) {
          let bodySegment = snake.positionArray[j];
          this._renderPixel(bodySegment[0], bodySegment[1], sBColor);
        }
      }
    },
    _renderFruits(frame) {
      for (let i=0; i<frame.fruitArray.length; i++) {
        let fruit = frame.fruitArray[i]
        for (let j=0; j<fruit.positionArray.length; j++) {
          let coord = fruit.positionArray[j];
          this._renderPixel(coord[0],coord[1], fColor);
        }
      }
    },
    _renderPixel(x, y, color) {
      context.fillStyle = color;
      context.fillRect(x*pWidth, y*pHeight, pWidth, pHeight);
    },
    // Game State
    setNextDir: function(snakeID, dir) {
      nextDir[snakeID] = dir;
    },
    // Debug
    printNextDir: function() {
      console.log(nextDir);
    },
