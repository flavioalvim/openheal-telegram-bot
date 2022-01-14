const Scene = require('telegraf/scenes/base')
const getCommandsAndActionsObject  = require('../../services/protocolosServices/object')
const getCorrectKeyboard = require('../../services/protocolosServices/keyboards')
const protocolsScene = new Scene('protocolsScene')
const getMainScene = require('../../services/protocolosServices/callbacks')


const commandsAndActions = getCommandsAndActionsObject()



protocolsScene.enter(getMainScene)
protocolsScene.leave((ctx) =>
    ctx.reply('Saindo do módulo de protocolos covid. Digite algo para novas opções')
)

commandsAndActions.forEach(
    ({ action, command, commandCallback, actionCallback }) => {
        protocolsScene.command(command, commandCallback)
        protocolsScene.action(action, actionCallback)
    }
)

protocolsScene.on('message', getMainScene)

module.exports = { 
    protocolsScene
     }