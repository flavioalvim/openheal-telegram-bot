const db = require('./database')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const getCorrectKeyboard = require('./keyboards')
const {getCommonCallback,getMainScene, getScaleCallback, getSubSpecialtyTelephonesTextCallback} = require ('./callbackTexts')
const {getSubSpecialtiesArray} = require('./utils.js')

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
    const objectSpecialties = db().map(({specialty,scaleMdFile})=>({specialty,scaleMdFile}))
    const objectSubSpecialties = objectSpecialties
        .map(({specialty}) => getSubSpecialtiesArray(specialty))
        .filter((item)=>item.length>0)
        .reduce((acc,item) => ([...acc, ...item]),[])
        .map(item => ({specialty: item, scaleMdFile: item.toLowerCase()}))

    const unionArray = [...objectSpecialties, ...objectSubSpecialties]
    const unionObject = unionArray.map(({specialty,scaleMdFile}) => (
        {
            command:specialty,
            commandCallback: getScaleCallback(scaleMdFile),
            action: `scale-${specialty}`,
            actionCallback: getScaleCallback(scaleMdFile)
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
        }
    ]// Array of objects


module.exports = {
    getRegularObject,
    getExtraObject}