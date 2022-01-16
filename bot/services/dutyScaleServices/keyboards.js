const { getSpecialties, getSubspecialties } = require('./database')
const { KeyboardFromArray, Keyboard } = require('../../components/keyboard')
const { getSpecialtiesArray } = require('./utils')
const {modifyString} = require('../../components/utils')

const getCorrectKeyboard = (option, specialty) => {
    const buttons = [...getSpecialtiesArray(), 'Voltar ao menu principal'] // Array of Objects
    const regularKeyboard = new KeyboardFromArray(buttons) //Keboard
    const returnKeyboard = new KeyboardFromArray(['Voltar'])

    const seeSpecialtyScaleKeyboard = new Keyboard(
        [
            {
                text: `Ver escala - ${specialty ?? ''}`,
                action: `escala_${specialty ?? ''}`,
            },
            { text: 'Voltar', action: 'Voltar' },
        ],
        1
    )

    // Busca pelo nome da especialidade ou da subespecialidade
    let array = getSpecialties().filter(
        (item) => !specialty || item === specialty
    )
    if (!array.length) {
        array = getSubspecialties().filter(
            (item) => item.specialty === specialty
        )
    }
    if (!array.length) {
        return
    }

    const subSpecialtiesButtons = array.map((item) => ({
        text: `Ver escala - ${item?.specialty ?? item}`,
        action: `escala_${item?.specialty ?? modifyString(item)}`,
    }))

    const seeSubScaleKeyboard = new Keyboard(
        [...subSpecialtiesButtons, { text: 'Voltar', action: 'Voltar' }],
        1
    )

    const keyboardOptions = {
        regular: regularKeyboard,
        seeScale: seeSpecialtyScaleKeyboard,
        return: returnKeyboard,
        seeSubScale: seeSubScaleKeyboard,
        customKeyboard: (buttons) => new KeyboardFromArray(buttons)
    }

    return keyboardOptions[option]
}

module.exports = getCorrectKeyboard
