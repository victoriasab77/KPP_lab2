const GAME_SPEED = 100 
const DIRECTIONS = {  
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
}
let INITIAL_SNAKE_SIZE = 2 
let SNAKE_COLOR = 'white'

let HEAD_COLOR = 'red'
let DOT_COLOR = 'green'    

const DIRECTION_UP = 'up';
const DIRECTION_RIGHT = 'right';
const DIRECTION_DOWN = 'down';
const DIRECTION_LEFT = 'left';

class Game {
  constructor(ui) {
    this.ui = ui
    this.reset()
    this.ui.bindHandlers(
      this.changeDirection.bind(this),
      this.quit.bind(this),
      this.start.bind(this)
    )
  }

  reset() {
    this.snake = []

    for (let i = INITIAL_SNAKE_SIZE; i >= 0; i--) {
      this.snake[INITIAL_SNAKE_SIZE - i] = { x: i, y: 0 }
    }
    this.drawBackArea()
    this.dot = {}
    this.dot_2 = {}
    this.score = 0
    this.currentDirection = DIRECTION_DOWN
    this.changingDirection = false
    this.timer = null
    SNAKE_COLOR = "white"
    this.generateDot()
    this.generateDot_2()
    this.ui.resetScore()
    this.ui.render()
  }


  changeDirection(_, key) {
    if ((key.name === DIRECTION_UP || key.name === 'w') && this.currentDirection !== DIRECTION_DOWN) {
      this.currentDirection = DIRECTION_UP
    }
    if ((key.name === DIRECTION_DOWN || key.name === 's') && this.currentDirection !== DIRECTION_UP) {
      this.currentDirection = DIRECTION_DOWN
    }
    if ((key.name === DIRECTION_LEFT || key.name === 'a') && this.currentDirection !== DIRECTION_RIGHT) {
      this.currentDirection = DIRECTION_LEFT
    }
    if ((key.name === DIRECTION_RIGHT || key.name === 'd') && this.currentDirection !== DIRECTION_LEFT) {
      this.currentDirection = DIRECTION_RIGHT
    }
  }


  moveSnake() {
    if (this.changingDirection) {
      return
    }
    this.changingDirection = true

    const head = {
      x: this.snake[0].x + DIRECTIONS[this.currentDirection].x,
      y: this.snake[0].y + DIRECTIONS[this.currentDirection].y,
    }

    this.snake.unshift(head)

    if (this.snake[0].x === this.dot_2.x && this.snake[0].y === this.dot_2.y) {
      this.score++
      this.changeColor()
      this.ui.updateScore(this.score)
      this.generateDot_2()
      /*if (this.score === 2){
        this.changeColor()
      }*/
      
    }
    else if (this.snake[0].x === this.dot.x && this.snake[0].y === this.dot.y) {
      this.score++
      this.changeColor()
      this.ui.updateScore(this.score)
      this.generateDot()
      /*if (this.score % 2 === 0){
        this.changeColor()
      }*/
    }
     
     else {
  
      this.snake.pop()
    }
  }

  generateRandomPixelCoord(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  generateDot() {
    this.dot.x = this.generateRandomPixelCoord(0, this.ui.gameContainer.width - 1)
    this.dot.y = this.generateRandomPixelCoord(1, this.ui.gameContainer.height - 1)

    this.snake.forEach(segment => {
      if (segment.x === this.dot.x && segment.y === this.dot.y) {
        this.generateDot()
      }
    })
  }

  generateDot_2() {
    this.dot_2.x = this.generateRandomPixelCoord(0, this.ui.gameContainer.width - 1)
    this.dot_2.y = this.generateRandomPixelCoord(1, this.ui.gameContainer.height - 1)

    this.snake.forEach(segment => {
      if (segment.x === this.dot_2.x && segment.y === this.dot_2.y) {
        this.generateDot_2()
      }
    })
  }

  drawBackArea(){
    this.ui.gameContainerForBorder = this.ui.blessed.box(this.ui.GameBoxForBorder)

    this.ui.createGameBoxForBorder()
  }

  drawSnake() {
    this.snake.forEach(segment => {
      
      this.ui.draw(segment, SNAKE_COLOR)
    })
    this.ui.draw(this.snake[0], HEAD_COLOR)
    
  }

  drawDot() {
    this.ui.draw(this.dot, DOT_COLOR)
    this.ui.draw(this.dot_2, DOT_COLOR)
  }

  isGameOver() {
    const collide = this.snake
      .filter((_, i) => i > 0)
      .some(segment => segment.x === this.snake[0].x && segment.y === this.snake[0].y)

    return (
      collide ||
      this.snake[0].x >= this.ui.gameContainer.width - 1 ||
      this.snake[0].x <= -1 ||
      this.snake[0].y >= this.ui.gameContainer.height - 1 ||
      this.snake[0].y <= -1
    )
  }

  showGameOverScreen() {
    this.ui.gameOverScreen()
    this.ui.render()
  }

  tick() {
    if (this.isGameOver()) {
      this.showGameOverScreen()
      clearInterval(this.timer)
      this.timer = null

      return
    }
    

    this.changingDirection = false
    this.ui.clearScreen()
    this.drawDot()
    this.moveSnake()
    this.drawSnake()
    this.ui.render()
    //this.changeColor
  }

  start() {
    if (!this.timer) {
      this.reset()
      //this.changeColor()
      this.timer = setInterval(this.tick.bind(this), GAME_SPEED)
      console.log('edfsdc')
    }
  }

  quit() {
    process.exit(0)
  }

  changeColor(){
    if(this.score %4 === 0) {
      SNAKE_COLOR = "black"
    }
    if(!(this.score %4 === 0)) {
      SNAKE_COLOR = "white"
    }

       /* function randColor() {
        var r = Math.floor(Math.random() * (256)),
            g = Math.floor(Math.random() * (256)),
            b = Math.floor(Math.random() * (256));
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }*/
    
  }


}

module.exports = { Game }