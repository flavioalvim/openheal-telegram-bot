const stage = require('telegraf/stage')
const { leave } = stage
const db = require('./database')
const getCorrectKeyboard = require('./keyboards')
const getMainScene = require('./callbacks')

const getContent = (content) => {
    if (typeof (content) === 'function') {
        return content()
    }
    return content
}

const reply = (content) => (ctx) => ctx.replyWithMarkdown(getContent(content), getCorrectKeyboard('return'))

const getRegularObject = (db) => db.map(({ action, content }) => (
    {
        command: action,
        commandCallback: reply(content),
        action,
        actionCallback: reply(content)
    })
)


const getExtraObject = () => [
    {
        "command": "Voltar",
        commandCallback: getMainScene,
        "action": "retornar",
        actionCallback: getMainScene
    },
    {
        "command": "voltar_ao_menu_principal",
        commandCallback: leave(),
        "action": "leave",
        actionCallback: leave()
    }
]

const getCommandsAndActionsObject = () => [...getRegularObject(db()), ...getExtraObject()]


module.exports = getCommandsAndActionsObject