const { keyboard } = require('telegraf/markup')
const db= require('./database')


const getSpecialtiesText = () => {
    const getSpecialties = () => db().map(item => item.specialty)
    return (getSpecialties().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:"))
} //String

const getScaleText = (specialty) => db()
    .filter(item => item.specialty == specialty)
    .map (item => item.scaleText).toString() // String de objetos filtrados

const getSubSpecialtyTelephonesText = (specialty, subSpecialty,keyboard) => {
    const text = db()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .filter(item => item.subSpecialty.includes(subSpecialty))
        .reduce((acc, {name, telephone}) => `${acc}${name} - ${telephone}\n\n`,`${specialty} - ${subSpecialty}\n\n`)

        return (ctx) => ctx.reply(text, keyboard)
}


module.exports = {getSpecialtiesText, 
    getSubSpecialtyTelephonesText, 
    getScaleText}