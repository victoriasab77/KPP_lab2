let { Game } = require('./src/Game')
let { UserInterface } = require('./src/UI')
let game = new Game(new UserInterface())

game.start()