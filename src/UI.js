const blessed = require('blessed')

class UserInterface {
  constructor() {
    this.blessed = blessed
    this.screen = blessed.screen()
    this.screen.title = 'Lab02 KPP'

    this.gameBox = this.createGameBox()
    this.scoreBox = this.createScoreBox()
    this.gameOverBox = this.createGameOverBox()
    this.GameBoxForBorder = this.createGameBoxForBorder()

    this.gameContainer = this.blessed.box(this.gameBox)
    this.gameContainerForBorder = this.blessed.box(this.GameBoxForBorder)
    this.scoreContainer = this.blessed.box(this.scoreBox)
  }

  createGameBox() {
    return {
      parent: this.screen,
      top: 4,
      left: 1,
      width: '100%-2',
      height: '100%-5',
      style: {
        fg: 'black',
        bg: 'blue',
      },
    }
  }


  createGameBoxForBorder() {
    return {
      border: {
        // type: 'line',
        bg: 'black'
      },
      parent: this.screen,
      top: 3,
      tags: true,
      width: '100%',
      height: '100%-3',
      style: {
        fg: '#white',
        bg: '#white',
      },
    }
  }

  createScoreBox() {
    return {
      border: {
        type: 'line',
      },
      parent: this.screen,
      top: 0,
      left: 'left',
      width: '100%',
      height: 3,
      tags: true,
      style: {
        fg: 'white',
        // bg: 'black',
      },
    }
  }

  createGameOverBox() {
    return {
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 20,
      height: 6,
      tags: true,
      valign: 'middle',
      content: `{center}GAME OVER!\n\nPress ENTER for restart!{/center}`,
      border: {
        type: 'line',
      },
      style: {
        fg: '#ffffff',
        bg: 'red',
        border: {
          fg: '#ffffff',
        },
      },
    }
  }

  bindHandlers(keyPressHandler, quitHandler, enterHandler) {
    this.screen.on('keypress', keyPressHandler)
    this.screen.key(['escape', 'q', 'C-c'], quitHandler)
    this.screen.key(['enter'], enterHandler)
  }

  draw(coord, color) {
    this.blessed.box({
      parent: this.gameContainer,
      top: coord.y,
      left: coord.x,
      width: 1, //*
      height: 1,
      style: {
        fg: color,
        bg: color,
      },
    })
  }

  updateScore(score) {
    this.scoreContainer.setLine(0, `{bold}Score:{/bold} ${score}`)
  }

  gameOverScreen() {
    this.gameContainer = this.blessed.box(this.gameOverBox)
  }

  clearScreen() {
    this.gameContainer.detach()
    this.gameContainer = this.blessed.box(this.gameBox)
  }

  resetScore() {
    this.scoreContainer.detach()
    this.scoreContainer = this.blessed.box(this.scoreBox)
    this.updateScore(0)
  }

  render() {
    this.screen.render()
  }
}

module.exports = { UserInterface }
