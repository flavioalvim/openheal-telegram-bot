const { KeyboardFromArray, Keyboard } = require('../../components/keyboard')
const { getSubSpecialtiesArray, getSpecialtiesArray } = require('./utils')

const getCorrectKeyboard = (option, specialty = '') => {
    const buttons = [...getSpecialtiesArray(), 'sair'] // Array of Objects
    const regularKeyboard = new KeyboardFromArray(buttons) //Keboard
    const returnKeyboard = new KeyboardFromArray(['Voltar'])

    const seeSpecialtyScaleKeyboard = new Keyboard(
        [
            {
                text: `Ver escala - ${specialty}`,
                action: `escala_${specialty}`,
            },
            { text: 'Voltar', action: 'Voltar' },
        ],
        1
    )

    const array = getSubSpecialtiesArray(specialty)
    const subSpecialtiesButtons = array.map((item) => ({
        text: `Ver escala - ${item?.specialty ?? item}`,
        action: `escala_${item?.specialty ?? item}`,
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
    }

    return keyboardOptions[option]
}

module.exports = getCorrectKeyboard
