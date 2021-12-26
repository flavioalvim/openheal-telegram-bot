const db = require('./database')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const getCorrectKeyboard = require('./keyboards')
const {getCommonCallbackText,getMainScene, getScaleText, getSubSpecialtyTelephonesTextCallback} = require ('./callbackTexts')
const getSubSpecialtiesArray = require('./utils.js')
const { get } = require('http')

const getRegularObject1 = () => 
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

const getRegularObject2 = () => [{
    command: "subSpecialty",
    commandCallback :"commonCallback",
    action :"subSpecialty",
    actionCallback: "commonCallback"
}]

console.log(getRegularObject2())



const getRegularObject = () => [...getRegularObject1(), ...getRegularObject2()]
console.log(getRegularObject())

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
            command: "texto",
            commandCallback: getScaleText,
            action: "texto",
            actionCallback: getScaleText
        }
    ]// Array of objects

module.exports = {
    getRegularObject,
    getExtraObject}