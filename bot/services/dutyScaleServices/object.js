const db = require('./database')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const {getCommonCallback,getMainScene, getScaleCallback} = require ('./callbackTexts')
const {getSubSpecialtiesArray} = require('./utils.js')
const {modifyString} = require('../../components/utils')


const getCommandsAndActionsObject = () =>
{
    const getStandardObject = () => 
    {
        const object = db().map(({specialty}) =>
        {
            const string = modifyString(specialty)
            return (
                {
                    command: string,
                    commandCallback :getCommonCallback(specialty),
                    action :string,
                    actionCallback: getCommonCallback(specialty)
                }
                )
        })
        return object
    }

    const getScaleObject = () => 
    {
        const objectSpecialties = db().map(({specialty,scaleMdFile})=>({specialty,scaleMdFile}))
        const objectSubSpecialties = objectSpecialties
        .map(({specialty}) => getSubSpecialtiesArray(specialty))
        .filter((item)=>item.length>0)
        .reduce((acc,item) => ([...acc, ...item]),[])
        .map(item => ({specialty: item, scaleMdFile: item.toLowerCase()}))

        const unionArray = [...objectSpecialties, ...objectSubSpecialties]
        const unionObject = unionArray.map(({specialty,scaleMdFile}) => 
        {
            const string = modifyString(specialty)
            return(
                {
                    command:`escala_${string}`,
                    commandCallback: getScaleCallback(scaleMdFile),
                    action: `escala_${string}`,
                    actionCallback: getScaleCallback(scaleMdFile)
                })
        })
        return unionObject
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
            action : "voltar",
            actionCallback: getMainScene
        }
    ]// Array of objects

    const commandsAndActions = [...getStandardObject(), ...getScaleObject(), ...getExtraObject()]
    return commandsAndActions
}



module.exports = {
    getCommandsAndActionsObject
}