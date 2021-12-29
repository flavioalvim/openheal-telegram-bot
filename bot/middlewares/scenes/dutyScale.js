const Scene = require ('telegraf/scenes/base')
const  {getMainScene, getCommon} = require ('../../services/dutyScaleServices')
const { getCommandsAndActionsObject } = require('../../services/dutyScaleServices/object')

const dutyScaleScene = new Scene('dutyScaleScene') //Scene
 
const commandsAndActions = getCommandsAndActionsObject()

dutyScaleScene.enter(getMainScene)
dutyScaleScene.leave(ctx=>ctx.reply("Saindo do mudulo escala. Digite algo para novas opções"))


commandsAndActions.forEach(({action , command, commandCallback, actionCallback})=>{
    dutyScaleScene.command(command,commandCallback)
    dutyScaleScene.action(action,actionCallback)
})

dutyScaleScene.on('message', getMainScene)


module.exports = {dutyScaleScene}