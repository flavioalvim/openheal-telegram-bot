const { db } = require('../database')

const getSubSpecialties = (specialty) => {
    try {
        const filter = db()
            .filter((item) => item.specialty == specialty)
            .map((item) => item.professionals)
            .reduce((acc, item) => [...acc, ...item], [])
            .map((item) => item.subSpecialty)
            .reduce((acc, item) => [...acc, ...item], [])

        return [...new Set(filter)]
    } catch {
        console.log('Parece que essa especialidade nao tem subespecialidades')
        return []
    }
}

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
    return db().filter(item => item.specialty === specialty)
}

module.exports = {
    getSubSpecialtiesArray,
    getSpecialtiesArray,
    getUnicObjectSpecialties,
}
