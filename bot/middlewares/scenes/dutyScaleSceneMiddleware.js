const Scene = require ('telegraf/scenes/base')

const  {db, getCorrectKeyboard} = require ('../../services/dutyScale')
const  {getExtraCommandsAndActionsObject, getMainScene, getRegularCommandsAndActionsObject} = require ('../../services/dutyScale/services')

const dutyScaleScene = new Scene('dutyScaleScene') //Scene

const regularCommandsAndActions = getRegularCommandsAndActionsObject()
const extraCommandsAndActions = getExtraCommandsAndActionsObject()  
const commandsAndActions = [...regularCommandsAndActions, ...extraCommandsAndActions]


dutyScaleScene.enter(getMainScene)
dutyScaleScene.leave(ctx=>ctx.reply("Saindo do mudulo escala. Digite algo para novas opções"))


commandsAndActions.forEach(({action , command, callBack})=>{
    dutyScaleScene.command(command,callBack)
    dutyScaleScene.action(action,callBack)
})

dutyScaleScene.on('message', getMainScene)


module.exports = {dutyScaleScene}