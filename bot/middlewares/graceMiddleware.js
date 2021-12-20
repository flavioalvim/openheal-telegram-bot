
const graceMiddleware = (keyboard)=>{
    return async (ctx,next) => await ctx.reply("Estamos em grace, oba", keyboard)
}

module.exports = graceMiddleware