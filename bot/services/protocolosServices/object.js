const stage = require('telegraf/stage')
const { leave } = stage
const db = require('./database')
const getCorrectKeyboard = require('./keyboards')
const getMainScene = require('./callbacks')

const getCommandsAndActionsObject = () => [...getRegularObject(db()), ...getExtraObject()]

const getRegularObject = (db) => {
    return (db.map(({ action, content }) => (
        {
            "command": action,
            commandCallback: (ctx) => ctx.replyWithMarkdown(content,getCorrectKeyboard('return')),
            "action": action,
            actionCallback: (ctx) => ctx.replyWithMarkdown(content,getCorrectKeyboard('return'))
        })
    ))
}


const getExtraObject = () => {
    return (
        [
            {
                "command":"Voltar",
                commandCallback: getMainScene,
                "action": "retornar",
                actionCallback: getMainScene
            },
            {
                "command":"voltar_ao_menu_principal",
                commandCallback: leave(),
                "action": "leave",
                actionCallback:leave()
            }
        ])
}

console.log(getCommandsAndActionsObject())

module.exports = getCommandsAndActionsObject