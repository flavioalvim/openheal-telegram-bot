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
            const telephonesText = professionals.reduce((acc,{name, telephone}) => (`${acc}\n${name} - ${telephone}\n`), `Lista de telefones - ${specialty}\n`)
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
        }
    ]// Array of objects

module.exports = {
    getRegularObject,
    getExtraObject}