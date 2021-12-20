
const crusadeMiddleware = (keyboard)=>{
    return async (ctx,next) => await ctx.reply("Estamos em crusade, oba", keyboard)
}

module.exports = crusadeMiddleware