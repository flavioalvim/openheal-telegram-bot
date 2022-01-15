require('dotenv').config()
const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
// const { KeyboardFromArray } = require('./components/keyboard')
const {
    dutyScaleScene,
    protocolsScene

} = require('./middlewares')
const verifyUserMiddleware = require('./middlewares/verifyUserMiddleware')
const {getUserContactMiddleware} = require('./middlewares/getUserContactMiddleware')
const {commands,actions,mainMenuOptions} = require('./components/mainMenu')

const {
    TELEGRAM_TOKEN
} = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)


const stage = new Stage([dutyScaleScene,protocolsScene])
bot.use(session())
bot.use(stage.middleware())
bot.use(getUserContactMiddleware)
bot.use(verifyUserMiddleware)


commands.forEach(({ command, callBack }) => {
    bot.command(command, callBack)
})


actions.forEach(({ action, callback }) => {
    bot.action(action, callback)
})

bot.start((ctx) => {
    console.log(ctx.update.message.from)
    ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}`)
})

bot.on('text', mainMenuOptions)

bot.startPolling()

