const db = require('./database')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const getCorrectKeyboard = require('./keyboards_old')
const {getCommonCallback,getMainScene, getScaleCallback, getSubSpecialtyTelephonesTextCallback} = require ('./callbackTexts')
const getSubSpecialtiesArray = require('./utils.js')

const getStandardObject = () => 
{
    const object = db().map(({specialty}) =>
    {   
        const commonCallback = getCommonCallback(specialty)

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

const getScaleObject = () => {
    const arraySpecialties = db().map(({specialty})=>specialty)
    const arraySubSpecialties = arraySpecialties.map(item =>getSubSpecialtiesArray(item))
    const unionArray = [...arraySpecialties, ...arraySubSpecialties]
    const unionObject = unionArray.map(item => (
        {
            command:item,
            commandCallback: getScaleCallback(item),
            action: `scale-${item}`,
            actionCallback: getScaleCallback(item)
        }))
    return unionObject
}

//console.log(getRegularObject2())



const getRegularObject = () => [...getStandardObject(), ...getScaleObject()]
//console.log(getRegularObject())

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
            commandCallback: getScaleCallback("Ecocardiograma".toLocaleLowerCase()),
            action: "texto",
            actionCallback: getScaleCallback("Ecocardiograma".toLocaleLowerCase())
        }
    ]// Array of objects


module.exports = {
    getRegularObject,
    getExtraObject}