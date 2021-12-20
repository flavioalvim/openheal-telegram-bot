
const dutyScaleMiddleware = (keyboard)=>{
    return async (ctx,next) => await ctx.reply("Estamos em escala, oba", keyboard)
}

module.exports = dutyScaleMiddleware