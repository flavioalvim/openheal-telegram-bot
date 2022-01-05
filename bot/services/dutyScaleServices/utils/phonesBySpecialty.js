const { uniqBy, flatMap, chunk } = require('lodash')
const { db } = require('../database')
const { renderTemplateMarkdown } = require('./template')

const getPhonesBySpecialty = (specialty) => {
    // Busca os profissionais da especialidade
    const { professionals } =
        db().find((item) => item.specialty === specialty) ?? {}

    if (!professionals?.length) {
        return
    }

    // Busca as sub especialidades dos profissionais e coloca em uma lista
    const subSpecialties = uniqBy(
        flatMap(professionals, (item) => item.subSpecialties ?? []),
        'specialty'
    )

    if (!subSpecialties.length) {
        // retorna o dataset regular com a especialidade principal
        return [
            {
                specialty,
                professionals: professionals.map((item) => ({
                    name: item.name,
                    telephones: item.telephones,
                })),
            },
        ]
    }

    // Retorna o dataset das subespecialidades
    return subSpecialties
        .sort((a, b) => (a.specialty < b.specialty ? -1 : 1)) // Ordem alfabetica
        .map((subSpecialty) => {
            // Busca os profissionais da subespecialidade
            const list = professionals.filter((professional) =>
                professional?.subSpecialties?.some(
                    (subSpecialty) => subSpecialty.specialty === subSpecialty.specialty
                )
            )

            return {
                specialty: subSpecialty.specialty,
                professionals: list.map((professional) => ({
                    name: professional.name,
                    telephones: professional.telephones,
                })),
            }
        })
}

const getMarkdownTextFromPhonesBySpecialty = (specialty) => {
    const specialties = getPhonesBySpecialty(specialty)
    return specialties.map(item => renderTemplateMarkdown('phones', {
        specialties: [item]
    }))
}

module.exports = {
    getPhonesBySpecialty,
    getMarkdownTextFromPhonesBySpecialty,
}
