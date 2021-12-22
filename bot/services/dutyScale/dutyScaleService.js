
const Stage = require ('telegraf/stage')
const {leave} = Stage
const {db,getCorrectKeyboard,getSpecialtiesText,getSubSpecialtyTelephonesText,getScaleText} = require('./index')

const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

const createScaleCommandsAndActionsObject =(item)=>({
    command : `Ver escala ${item}`,
    action : item,
    callBack : (ctx)=>ctx.reply(getScaleText(item))})

const getExtraCommandsAndActionsObject = ()=>
[
    {
        command: "sair",
        action : "sair",
        callBack : leave()
    },
    {
        command: "Voltar",
        action : "Voltar",
        callBack: getMainScene
    }
]// Array of objects



module.exports = { 
    db,
    getExtraCommandsAndActionsObject,
    getCorrectKeyboard,
    getMainScene,
    getScaleText,
    getSubSpecialtyTelephonesText,
    getScaleText
}