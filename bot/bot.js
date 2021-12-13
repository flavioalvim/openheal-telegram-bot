const env = require ('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf (env.token)
const Keyboard = require('./components/keyboard')
const KeyboardFromArray = require('./components/keyboard')

// const texts = ["grace", "crusade", "heart"]
// const opcoes_menu_principal = texts.map(item => ({text:item, action:item}))
// const k = new Keyboard (opcoes_menu_principal,3)

const k = new KeyboardFromArray(["grace", "crusade", "heart"],3)


// const opcoes_menu_grace = [
//     {text:"age", action:"age"},
//     {text:"creatinina", action:"creatinina"},
//     {text:"hematocrito", action:"hematocrito"},
//     {text:"pcr", action:"pcr"}
// ]
//const g = new Keyboard (opcoes_menu_grace,2)

const commands = [
{
    command: "grace", 
    callBack : async(ctx,next)=>{await ctx.reply("Estamos em grace", k)}
},
{
    command: "crusade", 
    callBack : async(ctx,next)=>{await ctx.reply("Estamos em crusade", k)}
},
{
    command: "heart", 
    callBack : async(ctx,next)=>{await ctx.reply("Estamos em heart", k)}
}
]


bot.start(ctx =>{ 
    console.log(ctx.update.message.from)
    ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}`)
})


commands.forEach(({command, callBack})=>{
    bot.command(command,callBack)
})

bot.on('text', async(ctx, next)=>{
    await ctx.reply('Escolha uma das opçoes abaixo', k)
})

bot.action("grace", ctx=>{
    ctx.reply("Estamos em grace", k)
})

bot.action("crusade", ctx=>{
    ctx.reply("Estamos em crusade",k)
})
bot.action("heart", ctx=>{
    ctx.reply("Estamos em heart",k)
})


bot.startPolling()