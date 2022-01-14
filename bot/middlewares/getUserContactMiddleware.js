
const fs = require('fs')

let data = []

const getUserContactMiddleware = (ctx, next) => {
    if(ctx.update.message){
    data.push(ctx.update.message.from)}
    console.log(data)
    next()
}

module.exports = {
    getUserContactMiddleware,
    data
}
