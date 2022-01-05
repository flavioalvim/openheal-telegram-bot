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
} = require('./middlewares')
const {
    verifyAndSaveUserMiddleware,
} = require('./middlewares/verifyAndSaveUserMiddleware')

const {
    TELEGRAM_TOKEN
} = process.env

const bot = new Telegraf(TELEGRAM_TOKEN)
const { enter } = Stage
const k = new KeyboardFromArray(['escala'], 3)
const k1 = new KeyboardFromArray(['escala', 'voltar'], 3)

const stage = new Stage([dutyScaleScene])
bot.use(session())
bot.use(stage.middleware())
//bot.use(verifyAndSaveUserMiddleware)

const commands = [
    {
        command: 'escalas',
        callBack: enter('dutyScaleScene'),
    },
]

commands.forEach(({ command, callBack }) => {
    bot.command(command, callBack)
})

const actions = [
    {
        action: 'escala',
        callback: enter('dutyScaleScene'),
    },
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
