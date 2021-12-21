const env = require ('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf (env.token)
const {Keyboard, KeyboardFromArray} = require('./components/keyboard')
const {graceMiddleware,crusadeMiddleware,heartMiddleware,dutyScaleScene} = require ('./middlewares')
const Stage = require ('telegraf/stage')
const session = require ('telegraf/session')
const {enter, leave} = Stage

const k = new KeyboardFromArray(["escala"],3)
const k1 = new KeyboardFromArray(["escala","voltar"],3)

const stage = new Stage([dutyScaleScene])
bot.use(session())
bot.use(stage.middleware())

const commands = [
{
    command: "escalas", 
    callBack : enter('dutyScaleScene')
}]

commands.forEach(({command, callBack})=>{
    bot.command(command,callBack)
})

const actions = [
    {
        action: "escala",
        callback: enter('dutyScaleScene')
    }
]

actions.forEach(({action,callback}) => {
    bot.action(action,callback)
})



bot.start(ctx =>{ 
    console.log(ctx.update.message.from)
    ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}`)
})


bot.on('text', async(ctx, next)=>{

    const finalText = commands
        .map(item => item.command)
        .reduce((acc,item)=> (`${acc}\n /${item}`),"Escolha uma opção abaixo :")
    ctx.reply(finalText,k)
})

bot.startPolling()