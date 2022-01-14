const db = require('./database')
const getCorrectKeyboard = require('./keyboards')

const getMainScene = (ctx)=>{
    const text = db().reduce((acc,item)=>`${acc}/${item.action}\n`,'Escolha umas das opções abaixo: \n')
    ctx.reply(text,getCorrectKeyboard("regular"))}

module.exports = getMainScene