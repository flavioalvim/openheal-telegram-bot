const env = require('../../.env')

const verifyUserMiddleware = (ctx, next) => {
    
    const sameIdMsg = ctx.update.message && ctx.update.message.from.id === env.userID
    const sameIdCallback = ctx.update.callback_query && ctx.update.callback_query.from.id === env.userID

    if(sameIdMsg || sameIdCallback){
        next()
    }else{
        ctx.reply("Desculpa mas esse usuario não está autorizado! Contacte o administrador...")
    }
}

module.exports = 
{
    verifyUserMiddleware,
}
