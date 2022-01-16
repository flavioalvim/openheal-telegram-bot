require('dotenv').config()
const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
// const { KeyboardFromArray } = require('./components/keyboard')
const {
    dutyScaleScene,
<<<<<<< Updated upstream
    protocolosCovidScene,
} = require('./middlewares')
const verifyUserMiddleware = require('./middlewares/verifyUserMiddleware')
const {
    getUserContactMiddleware,
} = require('./middlewares/getUserContactMiddleware')
=======
    protocolsScene

} = require('./middlewares')
const verifyUserMiddleware = require('./middlewares/verifyUserMiddleware')
const {getUserContactMiddleware} = require('./middlewares/getUserContactMiddleware')
const {commands,actions,mainMenuOptions} = require('./components/mainMenu')
>>>>>>> Stashed changes

const { NODE_ENV = 'development', TELEGRAM_TOKEN } = process.env

console.log('BOT Online 🔥')

// Desativa o console.log noFix ambiente de produção
if (NODE_ENV === 'production') {
    console.log = function() {}
}

const bot = new Telegraf(TELEGRAM_TOKEN)
<<<<<<< Updated upstream
const { enter } = Stage
const k = new KeyboardFromArray(['escala', 'protocolos_covid'], 1)
//const k1 = new KeyboardFromArray(['escala', 'voltar'], 3)

const stage = new Stage([dutyScaleScene, protocolosCovidScene])
=======


const stage = new Stage([dutyScaleScene,protocolsScene])
>>>>>>> Stashed changes
bot.use(session())
bot.use(stage.middleware())
bot.use(getUserContactMiddleware)
bot.use(verifyUserMiddleware)

<<<<<<< Updated upstream
const commands = [
    {
        command: 'escalas',
        callBack: enter('dutyScaleScene'),
    },
    {
        command: 'protocolos_covid',
        callBack: enter('protocolosCovidScene'),
    },
]
=======
>>>>>>> Stashed changes

commands.forEach(({ command, callBack }) => {
    bot.command(command, callBack)
})

<<<<<<< Updated upstream
const actions = [
    {
        action: 'escala',
        callback: enter('dutyScaleScene'),
    },
    {
        action: 'protocolos_covid',
        callback: enter('protocolosCovidScene'),
    },
]
=======
>>>>>>> Stashed changes

actions.forEach(({ action, callback }) => {
    bot.action(action, callback)
})

bot.start((ctx) => {
    console.log(ctx.update.message.from)
    ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}`)
})

bot.on('text', mainMenuOptions)

bot.startPolling()

