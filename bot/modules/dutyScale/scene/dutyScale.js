const rfr = require('rfr')
const Scene = require('telegraf/scenes/base')
const { mainMenuOptions } = require('../../../components/mainMenu')
const { getMainScene } = rfr('bot/modules/dutyScale/dutyScaleServices')
const {
    getCommandsAndActionsObject,
} = rfr('bot/modules/dutyScale/dutyScaleServices/object')


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
