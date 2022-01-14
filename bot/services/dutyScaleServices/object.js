const { db, getSubspecialties, getSpecialties } = require('./database')
const stage = require('telegraf/stage')
const {
    getCommonCallback,
    getMainScene,
    getScaleCallback,
} = require('./callbackTexts')
const { modifyString } = require('../../components/utils')

const { leave } = stage

const getCommandsAndActionsObject = () => {
    const getStandardObject = () => {
        const allItems = [
            ...db(),
            ...getSubspecialties(),
        ]
        const object = allItems.map(({ specialty }) => {
            const string = modifyString(specialty)
            return {
                command: string,
                commandCallback: getCommonCallback(specialty),
                action: string,
                actionCallback: getCommonCallback(specialty),
            }
        })
        return object
    }
    

    const getScaleObject = () => {
        const objectSpecialties = [...db().map(item=>({"specialty":item.specialty , "scaleMdFile":item.scaleMdFile })), ...getSubspecialties()]
        
        const unionObject = objectSpecialties.map(({ specialty, scaleMdFile }) => {
            const string = modifyString(specialty)
            return {
                command: `escala_${string}`,
                commandCallback: getScaleCallback(scaleMdFile),
                action: `escala_${string}`,
                actionCallback: getScaleCallback(scaleMdFile),
            }
        })
        return unionObject
    }

    const getExtraObject = () => [
        {
            command: 'voltar_ao_menu_principal',
            commandCallback: leave(),
            action: 'voltar_ao_menu_principal',
            actionCallback: leave(),
        },
        {
            command: 'Voltar',
            commandCallback: getMainScene,
            action: 'voltar',
            actionCallback: getMainScene,
        },
    ] // Array of objects

    const commandsAndActions = [
        ...getStandardObject(),
        ...getScaleObject(),
        ...getExtraObject(),
    ]

    return commandsAndActions
}

module.exports = {
    getCommandsAndActionsObject,
}
