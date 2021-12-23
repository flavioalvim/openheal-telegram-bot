const Scene = require ('telegraf/scenes/base')
const  {getExtraObject, getMainScene, getRegularObject} = require ('../../services/dutyScale')

const dutyScaleScene = new Scene('dutyScaleScene') //Scene

const regularObject = getRegularObject()
const extraObject = getExtraObject()  
const commandsAndActions = [...regularObject, ...extraObject]


dutyScaleScene.enter(getMainScene)
dutyScaleScene.leave(ctx=>ctx.reply("Saindo do mudulo escala. Digite algo para novas opções"))


commandsAndActions.forEach(({action , command, commandCallback, actionCallback})=>{
    dutyScaleScene.command(command,commandCallback)
    dutyScaleScene.action(action,actionCallback)
})

dutyScaleScene.on('message', getMainScene)


module.exports = {dutyScaleScene}