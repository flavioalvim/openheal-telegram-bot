const { db } = require('./database')
const getCorrectKeyboard = require('./keyboards')
const { getMarkdownTextFromPhonesBySpecialty, getAllPhones } = require('./utils')
const fs = require('fs')
const rfr = require ('rfr')

const getMainScene = (ctx) =>
    ctx.reply(getSpecialtiesText(), getCorrectKeyboard('regular'))

const getCommonCallback = (specialty) => async (ctx) => {
    const { message, buttons } = getAllPhones(specialty)

    const isMainSpecialty = db().some(item => item.specialty === specialty)

    const customButton = getCorrectKeyboard('customKeyboard', specialty)

    await ctx.replyWithMarkdown(
        message,
        buttons.length === 1 ? getCorrectKeyboard(
            buttons[0] === specialty ? 'seeScale' : 'seeSubScale',
            buttons[0]
        ) : customButton(buttons, !isMainSpecialty) 
    )
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
const getScaleCallback = (filename) => (ctx) => {
    try {
        const mdFile = fs
            .readFileSync(`${__dirname}/../../../data/dutyScale/mdFiles/${filename}.md`, { encoding: 'utf-8' })

        ctx.replyWithMarkdown(mdFile, getCorrectKeyboard('return'))
    } catch(error) {
        ctx.reply(
            'Não há escala para essa especialidade.',
            getCorrectKeyboard('return')
        )
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
