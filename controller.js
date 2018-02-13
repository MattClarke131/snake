"use strict"
console.log("controller.js loaded");
SnakeGame.Controller = function(node) {
  // private
  let view = node;
  let canvas = $('.snakeCanvas', node)[0];
  let context = canvas.getContext('2d');
  let pHeight = 10;
  let pWidth = 10;
  let bColor = '#333';
  let sHColor = '#0F0';
  let sBColor = '#5F5';
  let fColor = '#D00';
  let nextDir = {0: undefined, 1: undefined};
  let tickLength = 100;
  let timer = null;
  let players = 1;
  // public
  return {
    // Set Methods
    setNumPlayers(num) {
      players = num;
    },
    // Model
    model: SnakeGame.Model(),
    getGameOver: function() {
      return this.model.getCurrentFrame().gameOver;
    },
    // initialize
    initialize: function() {
      this._setModelCallBack();
      this.setKeys();
      this.bindButtons();
      this.newGame(players);
    },
    _setModelCallBack: function() {
      let controller = this;
      this.model.setContCallback (function() {
        controller.renderFrame(controller.model.getCurrentFrame());
        controller.updateScore();
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
      context.canvas.width = pWidth*(1+frame.xMax);
      context.canvas.height = pHeight*(1+frame.yMax)
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
    updateScore() {
      let scores = this.model.getScores();
      $('.snake1Score span').html(scores[0]);
      $('.snake2Score span').html(scores[1]);
    },
    // Key Binding
    setKeys() {
      let controller = this;
      const keyDispatch = {
        87: [0, 'up'],
        65: [0, 'left'],
        83: [0, 'down'],
        68: [0, 'right'],
        38: [1, 'up'],
        37: [1, 'left'],
        40: [1, 'down'],
        39: [1, 'right'],
        13: function() { controller.initialize() }
      };
      $(document).unbind();
      $(document).keydown(function(e) {
        const keyCode = e.which;
        const behavior = keyDispatch[keyCode];
        if (Array.isArray(behavior)) {
          const [ snakeCode, direction ] = behavior;
          controller.setNextDir(snakeCode, direction);
        }
        else if (typeof behavior == 'function') {
          behavior();
        }
        else {
          console.error("Controller keybinding")
        }
      });
    },
    // Button Binding
    bindButtons: function() {
      let controller = this;
      $('.start', node).click(function(){
        const numPlayers = Number($(this).data("numplayers"));
        controller.setNumPlayers(numPlayers);
        controller.newGame(numPlayers);
      });
    },
    // Game State
    newGame() {
      clearTimeout(timer);
      this.model.resetGame(players);
      this.renderFrame(this.model.getCurrentFrame());
      this.startTimer();
    },
    setNextDir: function(snakeID, dir) {
      nextDir[snakeID] = dir;
    },
    tick: function() {
      this.model.tickGame(nextDir);
    },
    lose: function() {
      let scores = this.model.getScores();
      if (players == 1) {
        alert("YOU GET NOTHING! YOU LOSE! GOOD DAY SIR!")
      } else if (players == 2) {
        if(scores[0] > scores[1]) {
          alert('PLAYER 1 WINS');
        } else if (scores[1] > scores[0]) {
          alert('PLAYER 2 WINS');
        } else {
          alert('DRAW');
        }
      }
    },
    // Timer
    startTimer: function() {
      let controller = this;
      if(this.getGameOver()) {
        this.lose();
      } else {
        this.tick();
        timer = setTimeout(function() {controller.startTimer()}, tickLength);
      };
    },
    // Debug
    printNextDir: function() {
      console.log(nextDir);
    },
  }
};

// temp for debugging
var controller = SnakeGame.Controller($(".snakeGame")[0]);
controller.initialize();
