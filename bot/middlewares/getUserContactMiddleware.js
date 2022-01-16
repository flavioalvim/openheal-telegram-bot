
const fs = require('fs')

let data = []

const getUserContactMiddleware = (ctx, next) => {
<<<<<<< Updated upstream
    //console.log(ctx.update.message.from)
    data.push(ctx.update.message?.from)
    //console.log(data)
=======
    if(ctx.update.message){
    data.push(ctx.update.message.from)}
>>>>>>> Stashed changes
    next()
}

module.exports = {
    getUserContactMiddleware,
    data
}
