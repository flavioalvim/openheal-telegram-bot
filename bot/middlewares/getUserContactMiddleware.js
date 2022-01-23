require('dotenv').config()
const fs = require('fs')
const Telegram = require('telegraf/telegram')

const {
    TELEGRAM_TOKEN
} = process.env


let data = []

const getUserContactMiddleware = (ctx, next) => {
    if(ctx.update.callback_query){
    console.log(`${ctx.update.callback_query.from.first_name} - ${ctx.update.callback_query.from.id}`)
    const telegram = new Telegram("1869286697:AAHhrYfBJHaWJkwUZ-diDP65fGRAu6_uHAo")
    telegram.sendMessage(1846365371, `${ctx.update.callback_query.from.first_name} - ${ctx.update.callback_query.from.id}`)
}
    next()
}


module.exports = {
    getUserContactMiddleware,
    data
}
