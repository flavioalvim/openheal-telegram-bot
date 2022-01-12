
const fs = require('fs')

let data = []

const getUserContactMiddleware = (ctx, next) => {
    //console.log(ctx.update.message.from)
    data.push(ctx.update.message?.from)
    //console.log(data)
    next()
}

module.exports = {
    getUserContactMiddleware,
    data
}
