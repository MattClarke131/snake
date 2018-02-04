console.log("controller.js loaded");
Snake.Controller = function(node) {
  // private
  let view = node;
  let initialFrame = new Frame(20, 30, 0, [new Snake(0, [[7,7],[7,8],[7,9]], 'up', 0)], [new Fruit([[5,5]], 1, 10000)], false);
  let currentFrame = initialFrame;
  let frames = [initialFrame];
  let canvas = $('.snakeCanvas')[0];
  let context = canvas.getContext('2d');
  let pHeight = 10;
  let pWidth = 10;
  let bColor = '#DDD';
  let sHColor = '#0F0';
  let sBColor = '#5F5';
  let fColor = '#D00';
  let nextDir = '';
  // public
  return {
    //Rendering
    renderInitFrame() {
      this.renderFrame(initialFrame);
    },
    renderFrame(frame) {
      context.fillStyle = bColor;
      context.fillRect(0, 0, pWidth* frame.xMax, pHeight*frame.yMax);
      this._renderSnakes(frame);
      this._renderFruits(frame);
    },
    _renderSnakes(frame) {
      for (let i=0; i<frame.snakeArray.length; i++) {
        let snake = frame.snakeArray[i];
        let headX = snake.positionArray[0];
        let headY = snake.positionArray[1];
        this._renderPixel(headX, headY, sHColor);
        for (let j=1; j<snake.positionArray.length; j++) {
          let coord = snake.positionArray[j];
          this._renderPixel(coord[0], coord[1], sBColor);
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
    }
}
