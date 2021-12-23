const db = require('./database')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const getCorrectKeyboard = require('./keyboards')
const {getSubSpecialtyTelephonesText} = require ('./callbackTexts')
const getMainScene = require ('./services')

const getRegularObject = () => 
{
    const object = db().map(({specialty, professionals}) =>
    {
        const commonCallback = (ctx)=>
        {
            const telephonesText = professionals.reduce((acc,{name, telephones}) => (`${acc}${name} - ${telephones.reduce((acc,{telephone})=>(`${acc}${telephone}\n`),"")}\t`), `Lista de telefones - ${specialty}\n\n`)
            ctx.reply(telephonesText, getCorrectKeyboard(specialty))
        }
            return (
                {
                    command: specialty,
                    commandCallback :commonCallback,
                    action :specialty,
                    actionCallback: commonCallback
                }
            )
    })
    return object
}


const getExtraObject = ()=>
    [
        {
            command: "sair",
            commandCallback : leave(),
            action : "sair",
            actionCallback : leave()
        },
        {
            command: "Voltar",
            commandCallback: getMainScene,
            action : "Voltar",
            actionCallback: getMainScene
        },
        {
            command: "mão",
            commandCallback: getSubSpecialtyTelephonesText("Ortopedia", "mão", getCorrectKeyboard("return")),
            action: "mão",
            actionCallback:getSubSpecialtyTelephonesText("Ortopedia", "mão", getCorrectKeyboard("return"))
        },
        {
            command: "ombro",
            commandCallback: getSubSpecialtyTelephonesText("Ortopedia", "ombro", getCorrectKeyboard("return")),
            action: "ombro",
            actionCallback:getSubSpecialtyTelephonesText("Ortopedia", "ombro", getCorrectKeyboard("return"))
        },
        {
            command: "cotovelo",
            commandCallback: getSubSpecialtyTelephonesText("Ortopedia", "cotovelo", getCorrectKeyboard("return")),
            action: "cotovelo",
            actionCallback:getSubSpecialtyTelephonesText("Ortopedia", "cotovelo", getCorrectKeyboard("return"))
        },
        {
            command: "quadril",
            commandCallback: getSubSpecialtyTelephonesText("Ortopedia", "quadril", getCorrectKeyboard("return")),
            action: "quadril",
            actionCallback:getSubSpecialtyTelephonesText("Ortopedia", "quadril", getCorrectKeyboard("return"))
        },
        {
            command: "joelho",
            commandCallback: getSubSpecialtyTelephonesText("Ortopedia", "joelho", getCorrectKeyboard("return")),
            action: "joelho",
            actionCallback:getSubSpecialtyTelephonesText("Ortopedia", "joelho", getCorrectKeyboard("return"))
        },
        {
            command: "pé",
            commandCallback: getSubSpecialtyTelephonesText("Ortopedia", "pé", getCorrectKeyboard("return")),
            action: "pé",
            actionCallback:getSubSpecialtyTelephonesText("Ortopedia", "pé", getCorrectKeyboard("return"))
        }
    ]// Array of objects

module.exports = {
    getRegularObject,
    getExtraObject}