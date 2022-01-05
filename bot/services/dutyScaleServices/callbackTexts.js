//const { keyboard } = require('telegraf/markup')
const { db } = require('./database')
const getCorrectKeyboard = require('./keyboards')
const { getMarkdownTextFromPhonesBySpecialty } = require('./utils')
const fs = require('fs')

const getMainScene = (ctx) =>
    ctx.reply(getSpecialtiesText(), getCorrectKeyboard('regular'))

const getCommonCallback = (specialty) => {
    return async (ctx) => {
        const messages = getMarkdownTextFromPhonesBySpecialty(specialty)

        const lastMessage = messages.pop()

        for (const message of messages) {
            await ctx.reply(message)
        }

        await ctx.replyWithMarkdown(
            lastMessage,
            getCorrectKeyboard('seeSubScale', specialty)
        )

        // const professionals = getProfessionals(specialty)
        // const subSpecialtiesArray = getSubSpecialtiesArray(specialty)
        // const professionalSubSpecialties = (professional) =>
        //     professional.subSpecialties.map((item) => item.specialty)

        // const innerText =
        //     !!subSpecialtiesArray.length &&
        //     professionals.reduce(
        //         (acc, { subSpecialties, professionals }) =>
        //             `${acc}*${subSpecialties}*\n\n${getProfessionalsString(
        //                 professionals
        //             )}\n\n`,
        //         ''
        //     )

        // if (innerText) {
        //     ctx.replyWithMarkdown(
        //         `*Telefones - ${specialty}*\n ${innerText}`,
        //         getCorrectKeyboard('seeSubScale', specialty)
        //     )
        // } else {
        //     //console.log(professionals)
        //     const telephonesText = professionals.reduce(
        //         (acc, { name, telephones }) =>
        //             `${acc}${name} - ${getTelephonesString(telephones)}\n`,
        //         `*Lista de telefones - ${specialty}*\n\n`
        //     )
        //     ctx.replyWithMarkdown(
        //         telephonesText,
        //         getCorrectKeyboard('seeScale', specialty)
        //     )
        // }
    }
}

const getSpecialtiesText = () => {
    const getSpecialties = () =>
        db().map(({ specialty }) => {
            const string = specialty
                .toString()
                .replace(' ', '_')
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
            return string
        })
    return getSpecialties()
        .sort()
        .reduce(
            (acc, item) => `${acc} \n /${item}`,
            'Essas são as escalas de sobreaviso:'
        )
} //String

//Acertar se o arquivo nao existir
function getScaleCallback(filename) {
    return (ctx) => {
        try {
            const mdFile = fs
                .readFileSync(__dirname + '/mdFiles/' + `${filename}.md`)
                .toString()
            console.log(mdFile)
            ctx.replyWithMarkdown(mdFile, getCorrectKeyboard('return'))
        } catch {
            ctx.reply(
                'Não há escala para essa especialidade.',
                getCorrectKeyboard('return')
            )
        }
    }
}

const getSubSpecialtiesTelephonesTextCallback = (
    specialty,
    subSpecialties,
    keyboard
) => {
    const text = db()
        .filter((item) => item.specialty == specialty)
        .map((item) => item.professionals)
        .reduce((acc, item) => [...acc, ...item], [])
        .filter((item) => item.subSpecialties.includes(subSpecialties))
        .reduce(
            (acc, { name, telephones }) =>
                `${acc}${name} - ${telephones.reduce(
                    (acc, { telephone }) => `${acc}${telephone}\n`,
                    ''
                )}\n`,
            `${specialty} - ${subSpecialties}\n\n`
        )

    return (ctx) => ctx.reply(text, keyboard)
}

module.exports = {
    getSpecialtiesText,
    getSubSpecialtiesTelephonesTextCallback,
    getScaleCallback,
    getCommonCallback,
    getMainScene,
}
