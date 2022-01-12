require('dotenv').config()
const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
const { KeyboardFromArray } = require('./components/keyboard')
const {
    graceMiddleware,
    crusadeMiddleware,
    heartMiddleware,
    dutyScaleScene,
    protocolosCovidScene

} = require('./middlewares')
const verifyUserMiddleware = require('./middlewares/verifyUserMiddleware')
const {getUserContactMiddleware} = require('./middlewares/getUserContactMiddleware')

const {
    TELEGRAM_TOKEN
} = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)
const { enter } = Stage
const k = new KeyboardFromArray(['escala','protocolos_covid'], 1)
//const k1 = new KeyboardFromArray(['escala', 'voltar'], 3)

const stage = new Stage([dutyScaleScene,protocolosCovidScene])
bot.use(session())
bot.use(stage.middleware())
bot.use(getUserContactMiddleware)
bot.use(verifyUserMiddleware)

const commands = [
    {
        command: 'escalas',
        callBack: enter('dutyScaleScene')
    },
    {
        command: 'protocolos_covid',
        callBack: enter('protocolosCovidScene')
    }
]

commands.forEach(({ command, callBack }) => {
    bot.command(command, callBack)
})

const actions = [
    {
        action: 'escala',
        callback: enter('dutyScaleScene')
    },
    {
        action: 'protocolos_covid',
        callback: enter('protocolosCovidScene')
    }
]

actions.forEach(({ action, callback }) => {
    bot.action(action, callback)
})

bot.start((ctx) => {
    console.log(ctx.update.message.from)
    ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}`)
})

bot.on('text', async (ctx, next) => {
    const finalText = commands
        .map((item) => item.command)
        .reduce(
            (acc, item) => `${acc}\n /${item}`,
            'Escolha uma opção abaixo :'
        )
    //console.log(ctx)
    ctx.reply(finalText, k)
})

bot.startPolling()
