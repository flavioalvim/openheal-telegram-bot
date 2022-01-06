const _ = require("lodash")
const { db } = require('./database')


const scale = (db) => {

    const getDataFromSpecialty = (specialty) => (
        {
            "data": db.find(item => item.specialty === specialty)
        })

    const getProfessionalsFrom = (specialty) => {
        function getProfessional(name) {

            function getTelephones() {
                return ({
                    "data": getDataFromSpecialty(specialty).data.professionals.find(item => item.name === name).telephones
                })
            }

            return ({
                "data": getDataFromSpecialty(specialty).data.professionals.find(item => item.name === name),
                getTelephones
            })
        }

        return ({
            "data": getDataFromSpecialty(specialty).data.professionals,
            getProfessional
        })
    }

    const getSubSpeciatiesArrayFrom = (specialty) =>{
        const r = _.flatMap(getProfessionalsFrom(specialty).data.map(({subSpecialties}) => subSpecialties))
        return (_.uniqBy(r,"specialty"))
    }



    return ({
        "data": db,
        getDataFromSpecialty,
        getProfessionalsFrom,
        getSubSpeciatiesArrayFrom
    })
}

const l = scale(db())
//console.log(l.getProfessionalsFrom("Ecocardiograma").getProfessional("Cinara").getTelephones())
//const arrayNomes =  l.getProfessionalsFrom("Ecocardiograma").data.map(item =>item.name)
//console.log(arrayNomes)
console.log(l.getSubSpeciatiesArrayFrom("Ortopedia"))



const modifyString = (string) => {
    const newString = _.deburr(_.toLower(string)).replace(" ", "_")
    console.log(newString)
    return newString
}




module.exports = scale
