const Scene = require('telegraf/scenes/base')
const getCommandsAndActionsObject  = require('../../services/protocolosServices/object')
const getCorrectKeyboard = require('../../services/protocolosServices/keyboards')
const protocolsScene = new Scene('protocolsScene')
const db = require('../../services/protocolosServices/database')

const commandsAndActions = getCommandsAndActionsObject()

const getMainScene = (ctx)=>{
    const text = db().reduce((acc,item)=>`${acc}/${item.action}\n`,'Escolha umas das opções abaixo: \n')
    ctx.reply(text,getCorrectKeyboard("regular"))}

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