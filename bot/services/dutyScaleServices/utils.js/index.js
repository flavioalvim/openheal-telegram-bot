
const db = require('../database')
const getSubSpecialtiesArray = (specialty) => {

    try
    {
    const filter = db()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .map(item =>item.subSpecialty)
        .reduce((acc,item) => [...acc , ...item],[])

    return ([...new Set(filter)])
    
    }
    catch
    {
        console.log("Parece que essa especialidade nao tem subespecialidades")
        return []
    }}


    const getSpecialtiesArray = () => db().map(({specialty}) => specialty).sort()

    module.exports = {
        getSubSpecialtiesArray,
        getSpecialtiesArray}