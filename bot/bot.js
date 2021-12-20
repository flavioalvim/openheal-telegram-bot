const env = require ('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf (env.token)
const {Keyboard, KeyboardFromArray} = require('./components/keyboard')
const {graceMiddleware,crusadeMiddleware,heartMiddleware,dutyScaleMiddleware} = require ('./middlewares')


const k = new KeyboardFromArray(["grace", "crusade", "heart", "escala"],3)


const commands = [
{
    command: "grace", 
    callBack : graceMiddleware(k)
},
{
    command: "crusade", 
    callBack : crusadeMiddleware(k)
},
{
    command: "heart", 
    callBack : heartMiddleware(k)
},
{
    command: "escalas", 
    callBack : dutyScaleMiddleware(k)
}
]

commands.forEach(({command, callBack})=>{
    bot.command(command,callBack)
})

const actions = [
    {
        action : "grace",
        callback: graceMiddleware()
    },
    {
        action : "crusade",
        callback: ctx=>{
        ctx.reply("Estamos em crusade action", k)}
    },
    {
        action : "heart",
        callback: ctx=>{
        ctx.reply("Estamos em heart action", k)}
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
    ctx.reply(finalText)
})

bot.startPolling()