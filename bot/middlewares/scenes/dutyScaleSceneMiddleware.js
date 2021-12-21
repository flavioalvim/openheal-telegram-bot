const Scene = require ('telegraf/scenes/base')

const {
    getDataBase, 
    getExtraCommandsAndActionsObject,
    getCorrectKeyboard,getMainScene} = require ('../../services/dutyScaleService')

const dutyScaleScene = new Scene('dutyScaleScene') //Scene

const regularCommandsAndActions = getDataBase().map(({specialty, professionals}) =>({
    command: specialty,
    action :specialty,
    callBack: (ctx)=>{
        const telephonesText = professionals.reduce((acc,{name, telephone}) => (`${acc}\n${name} - ${telephone}\n`), `Lista de telefones - ${specialty}\n`)
        ctx.reply(telephonesText, getCorrectKeyboard(specialty))}
})) //Array of Objects

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