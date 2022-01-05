const crusadeMiddleware = (keyboard) => (ctx, next) => ctx.reply('Estamos em crusade, oba', keyboard)

module.exports = crusadeMiddleware
