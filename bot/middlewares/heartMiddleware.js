
const heartMiddleware = (keyboard)=>{
    return async (ctx,next) => await ctx.reply("Estamos em heart, oba", keyboard)
}

module.exports = heartMiddleware