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
  let tickLength = 500;
  let timer = null;
  // public
  return {
    // Model
    model: SnakeGame.Model(),
    getGameOver: function() {
      return this.model.getCurrentFrame().gameOver;
    },
    // initialize
    initialize: function() {
      this.model.resetGame();
      this.renderFrame(this.model.getCurrentFrame());
      this._setModelCallBack();
      this.setKeys();
      this.startTimer();
    },
    _setModelCallBack: function() {
      let controller = this;
      this.model.setContCallback (function() {
        controller.renderFrame(controller.model.getCurrentFrame());
      });
    },
    _setInitialNextDir: function() {
      nextDir = {};
      let numPlayers = model.InitialFrame().snakeArray.length;
      for(i=0; i<numPlayers; i++) {
        nextDir[i] = '';
      };
    },
    // Rendering
    renderFrame(frame) {
      context.fillStyle = bColor;
      context.fillRect(0, 0, pWidth*(1+frame.xMax), pHeight*(1+frame.yMax));
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
    // Key Binding
    setKeys() {
      let controller = this;
      $(document).unbind();
      $(document).keydown(function(e) {
        switch(e.which) {
          case 87:
            controller.setNextDir(0, 'up');
            break;
          case 65:
            controller.setNextDir(0, 'left');
            break;
          case 83:
            controller.setNextDir(0, 'down');
            break;
          case 68:
            controller.setNextDir(0, 'right');
            break;
          case 38:
            controller.setNextDir(1, 'up');
            break;
          case 37:
            controller.setNextDir(1, 'left');
            break;
          case 40:
            controller.setNextDir(1, 'down');
            break;
          case 39:
            controller.setNextDir(1, 'right');
            break;
        }
      });
    },
    // Game State
    setNextDir: function(snakeID, dir) {
      nextDir[snakeID] = dir;
    },
    tick: function() {
      this.model.tickGame(nextDir);
    },
    lose: function() {
      alert('you lose');
    },
    // Timer
    startTimer: function() {
      let controller = this;
      if(this.getGameOver()) {
        this.lose();
      } else {
        this.tick();
        setTimeout(function() {controller.startTimer()}, tickLength);
      };
    },
    // Debug
    printNextDir: function() {
      console.log(nextDir);
    },
