const { TELEGRAM_USER_ID } = process.env

const userIds = (TELEGRAM_USER_ID ?? '0')
    .split(',')
    .map(Number)
    .filter((id) => id > 0)

const verifyUserMiddleware = (ctx, next) => {
    const sameIdMsg =
        ctx.update.message && userIds.includes(ctx.update.message.from.id)
    const sameIdCallback =
        ctx.update.callback_query &&
        userIds.includes(ctx.update.callback_query.from.id)

    if (sameIdMsg || sameIdCallback) {
        next()
    } else {
        console.log('verified')
        ctx.toSave = ctx.update.message.from || ctx.update.callback_query.from
        ctx.reply(
            'Desculpa mas esse usuario não está autorizado! Contacte o administrador...'
        )
        next()
    }
}

const saveIDsMiddleware = (ctx, next) => {
    //console.log(ctx)
    if (ctx.toSave) {
        //grave e esvazie toSave
        //fs.writeFile('./toSave.json',ctx.toSave.toString(),{encoding:"utf8",flag:"w"},(err)=>console.log(err))
        ctx.toSave = {}
    }
}

const exec = (ctx, ...middlewares) => {
    const run = (index) => {
        middlewares &&
            index < middlewares.length &&
            middlewares[index](ctx, () => run(index + 1))
    }
    run(0)
}

const verifyAndSaveUserMiddleware = (ctx, next) => {
    exec(ctx, verifyUserMiddleware, saveIDsMiddleware)
}

module.exports = {
    verifyAndSaveUserMiddleware,
}
