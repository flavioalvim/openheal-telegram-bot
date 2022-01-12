const fs = require('fs')
const stage = require('telegraf/stage')
const { leave } = stage
const dir = __dirname + '/mdFiles'

fs.readdir(dir, (err, arquivos) => {
    arquivos.forEach((arquivo) => {
        console.log(arquivo)
    })
})

const getCommandsAndActionsObject = () => [
    {
        command: 'protocolo_covid',
        commandCallback: (ctx) => ctx.reply('callback'),
        action: 'protocolo_covid',
        actionCallback: (ctx) => ctx.reply('actoncallback'),
    },
    {
        command: 'sair',
        commandCallback: leave(),
        action: 'sair',
        actionCallback: leave(),
    },
]

module.exports = getCommandsAndActionsObject
