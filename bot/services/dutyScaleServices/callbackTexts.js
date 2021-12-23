const { keyboard } = require('telegraf/markup')
const db= require('./database')
const getCorrectKeyboard =require ('./keyboards')




const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

const getCommonCallbackText = (specialty, professionals) => {return ((ctx)=>
{
    const telephonesText = professionals.reduce((acc,{name, telephones}) => (`${acc}${name} - ${telephones.reduce((acc,{telephone})=>(`${acc}${telephone}\n`),"")}\t`), `Lista de telefones - ${specialty}\n\n`)
    ctx.reply(telephonesText, getCorrectKeyboard(specialty))
})}

const getSpecialtiesText = () => {
    const getSpecialties = () => db().map(item => item.specialty)
    return (getSpecialties().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:"))
} //String

// const getScaleText = (specialty) => db()
//     .filter(item => item.specialty == specialty)
//     .map (item => item.scaleText).toString() // String de objetos filtrados

const getScaleText = (ctx) => {
    
    const msg = `Ola
    Esste texto é para testar
    Nova linha
    <a href = "http://www.ig.com.br">ig</a>
    <a href = "tel:+5521992218007">99221-8007</a>`

    ctx.replyWithHTML (msg)}

const getSubSpecialtyTelephonesTextCallback = (specialty, subSpecialty,keyboard) => {
    const text = db()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .filter(item => item.subSpecialty.includes(subSpecialty))
        .reduce((acc, {name, telephones}) => `${acc}${name} - ${telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,"")}`,`${specialty} - ${subSpecialty}\n\n`)


        return (ctx) => ctx.reply(text, keyboard)
}



module.exports = {getSpecialtiesText, 
    getSubSpecialtyTelephonesTextCallback, 
    getScaleText,
    getCommonCallbackText,
    getMainScene}
