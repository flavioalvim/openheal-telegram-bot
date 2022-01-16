const Scene = require('telegraf/scenes/base')
const { mainMenuOptions } = require('../../components/mainMenu')
const { getMainScene } = require('../../services/dutyScaleServices')
const {
    getCommandsAndActionsObject,
} = require('../../services/dutyScaleServices/object')


const dutyScaleScene = new Scene('dutyScaleScene') //Scene

const commandsAndActions = getCommandsAndActionsObject()

dutyScaleScene.enter(getMainScene)
dutyScaleScene.leave(mainMenuOptions)

commandsAndActions.forEach(
    ({ action, command, commandCallback, actionCallback }) => {
        dutyScaleScene.command(command, commandCallback)
        dutyScaleScene.action(action, actionCallback)
    }
)

dutyScaleScene.on('message', getMainScene)

module.exports = { dutyScaleScene }
