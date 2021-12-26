const db = require('./database')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const getCorrectKeyboard = require('./keyboards')
const {getSubSpecialtyTelephonesTextCallback,getCommonCallbackText,getMainScene, getScaleText} = require ('./callbackTexts')


const getRegularObject = () => 
{
    const object = db().map(({specialty}) =>
    {   
        const commonCallback = getCommonCallbackText(specialty)

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
            commandCallback: getSubSpecialtyTelephonesTextCallback("Ortopedia", "mão", getCorrectKeyboard("return")),
            action: "mão",
            actionCallback:getSubSpecialtyTelephonesTextCallback("Ortopedia", "mão", getCorrectKeyboard("return"))
        },
        {
            command: "ombro",
            commandCallback: getSubSpecialtyTelephonesTextCallback("Ortopedia", "ombro", getCorrectKeyboard("return")),
            action: "ombro",
            actionCallback:getSubSpecialtyTelephonesTextCallback("Ortopedia", "ombro", getCorrectKeyboard("return"))
        },
        {
            command: "cotovelo",
            commandCallback: getSubSpecialtyTelephonesTextCallback("Ortopedia", "cotovelo", getCorrectKeyboard("return")),
            action: "cotovelo",
            actionCallback:getSubSpecialtyTelephonesTextCallback("Ortopedia", "cotovelo", getCorrectKeyboard("return"))
        },
        {
            command: "quadril",
            commandCallback: getSubSpecialtyTelephonesTextCallback("Ortopedia", "quadril", getCorrectKeyboard("return")),
            action: "quadril",
            actionCallback:getSubSpecialtyTelephonesTextCallback("Ortopedia", "quadril", getCorrectKeyboard("return"))
        },
        {
            command: "joelho",
            commandCallback: getSubSpecialtyTelephonesTextCallback("Ortopedia", "joelho", getCorrectKeyboard("return")),
            action: "joelho",
            actionCallback:getSubSpecialtyTelephonesTextCallback("Ortopedia", "joelho", getCorrectKeyboard("return"))
        },
        {
            command: "pé",
            commandCallback: getSubSpecialtyTelephonesTextCallback("Ortopedia", "pé", getCorrectKeyboard("return")),
            action: "pé",
            actionCallback:getSubSpecialtyTelephonesTextCallback("Ortopedia", "pé", getCorrectKeyboard("return"))
        },
        {
            command: "texto",
            commandCallback: getScaleText,
            action: "texto",
            actionCallback: getScaleText
        }
    ]// Array of objects

module.exports = {
    getRegularObject,
    getExtraObject}