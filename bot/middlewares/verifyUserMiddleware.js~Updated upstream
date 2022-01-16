const { TELEGRAM_USER_ID, BYPASS_VERIFICATION = 'false' } = process.env

const userIds = (TELEGRAM_USER_ID ?? '0')
    .split(',')
    .map(Number)
    .filter((id) => id > 0)

const verifyUserMiddleware = (ctx, next) => {
    if (BYPASS_VERIFICATION === 'true') {
        return next()
    }

    const sameIdMsg =
        ctx.update.message && userIds.includes(ctx.update.message.from.id)
    const sameIdCallback =
        ctx.update.callback_query &&
        userIds.includes(ctx.update.callback_query.from.id)

    if (sameIdMsg || sameIdCallback) {
        next()
    } else {
        console.log('not verified')
        ctx.toSave = ctx.update.message.from || ctx.update.callback_query.from
        ctx.reply(
            'Desculpa mas esse usuário não está autorizado! Contacte o administrador...'
        )
    }
}



module.exports = verifyUserMiddleware
