const fs = require('fs')
const Scene = require('telegraf/scenes/base')
const getCommandsAndActionsObject = require('../../services/protocolosCovidServices/object')

const txt = fs.readFileSync(
    `${__dirname}/../../services/protocolosCovidServices/mdFiles/protocoloCovid.md`,
    'utf-8'
)

const protocolosCovidScene = new Scene('protocolosCovidScene') //Scene

const commandsAndActions = getCommandsAndActionsObject()
const getMainScene = (ctx) => ctx.replyWithMarkdown(txt)

protocolosCovidScene.enter(getMainScene)
protocolosCovidScene.leave((ctx) =>
    ctx.reply(
        'Saindo do mudulo de protocolos covid. Digite algo para novas opções'
    )
)

commandsAndActions.forEach(
    ({ action, command, commandCallback, actionCallback }) => {
        protocolosCovidScene.command(command, commandCallback)
        protocolosCovidScene.action(action, actionCallback)
    }
)

protocolosCovidScene.on('message', getMainScene)

module.exports = { protocolosCovidScene }
