const heartMiddleware = (keyboard) => (ctx, next) =>
    ctx.reply('Estamos em heart, oba', keyboard)

module.exports = heartMiddleware
