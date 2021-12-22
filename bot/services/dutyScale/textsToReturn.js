const db= require('./database')


const getSpecialtiesText = () => {
    const getSpecialties = () => db().map(item => item.specialty)
    return (getSpecialties().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:"))
} //String

const getScaleText = (specialty) => db()
    .filter(item => item.specialty == specialty)
    .map (item => item.scaleText).toString() // String de objetos filtrados

const getSubSpecialtyTelephonesText = (specialty, subSpecialty) => {
    const text = db()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .filter(item => item.subSpecialty.includes(subSpecialty))
        .reduce((acc, {name, telephone}) => `${acc}${name} - ${telephone}\n`,`${specialty} - ${subSpecialty}\n\n`)
        
        return text
}


module.exports = {getSpecialtiesText, getSubSpecialtyTelephonesText, getScaleText}