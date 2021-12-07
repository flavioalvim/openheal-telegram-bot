const env = require ('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf (env.token)
const Keyboard = require('./components/keyboard')

const opcoes_menu_principal = [
    {text : "grace", action : "grace"},
    {text : "crusade", action : "crusade"},
    {text : "heart", action : "heart"}
]
const k = new Keyboard (opcoes_menu_principal,1)



const opcoes_menu_grace = [
    {text:"age", action:"age"},
    {text:"creatinina", action:"creatinina"},
    {text:"hematocrito", action:"hematocrito"},
    {text:"pcr", action:"pcr"}
]
const g = new Keyboard (opcoes_menu_grace,2)


bot.start(ctx =>{ 
    console.log(ctx.update.message.from)
    ctx.reply(`Seja bem vindo ${ctx.update.message.from.first_name}`)
})



bot.command("grace", async(ctx,next)=>{
    await ctx.reply("Estamos em grace", g)
})

bot.on('text', async(ctx, next)=>{
    await ctx.reply('Escolha uma das opçoes abaixo', k)
})

bot.action("grace", ctx=>{
    ctx.reply("Estamos em grace", g)
})

bot.action("crusade", ctx=>{
    ctx.reply("Estamos em crusade")
})
bot.action("heart", ctx=>{
    ctx.reply("Estamos em heart")
})


bot.startPolling()