const Scene = require('telegraf/scenes/base')
const getCommandsAndActionsObject  = require('../../services/protocolsServices/object')
//const getCorrectKeyboard = require('../../services/protocolsServices/keyboards')
const protocolsScene = new Scene('protocolsScene')
const getMainScene = require('../../services/protocolsServices/callbacks')
const  {mainMenuOptions} =require('../../components/mainMenu')

const commandsAndActions = getCommandsAndActionsObject()

protocolsScene.enter(getMainScene)
protocolsScene.leave(mainMenuOptions)

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