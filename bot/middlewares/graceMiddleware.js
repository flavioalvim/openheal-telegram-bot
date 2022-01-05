const graceMiddleware = (keyboard) => (ctx, next) =>
    ctx.reply('Estamos em grace, oba', keyboard)

module.exports = graceMiddleware
