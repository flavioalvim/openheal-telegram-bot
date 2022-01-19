const { db } = require('../database')

const getSpecialtiesArray = () =>
    db()
        .map(({ specialty }) => specialty)
        .sort()

//recebe um array de objetos {specialty, scaleMdFile} com repetidos e devolve um array de objetos unicos

const getUnicObjectSpecialties = (arrayOfObjects) => {
    let specialtyArray = []

    const unicObjectSpecialties = arrayOfObjects.filter(
        ({ specialty, scaleMdFile }) => {
            if (!specialtyArray.includes(specialty)) {
                specialtyArray.push(specialty)
                return { specialty: specialty, scaleMdFile: scaleMdFile }
            }
        }
    )
    return unicObjectSpecialties
}

const getSubSpecialtiesArray = (specialty) => {
    return db().filter((item) => item.specialty === specialty)
}

module.exports = {
    getSubSpecialtiesArray,
    getSpecialtiesArray,
    getUnicObjectSpecialties,
}
