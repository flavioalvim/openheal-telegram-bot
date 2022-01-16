const Stage = require('telegraf/stage')
const { enter } = Stage
const { KeyboardFromArray } = require('../components/keyboard')

const k = new KeyboardFromArray(['escala','protocolos'], 1)

const commands = [
    {
        command: 'escalas',
        callBack: enter('dutyScaleScene')
    },
    {
        command: 'protocolos',
        callBack: enter('protocolsScene')
    }
]

const actions = [
    {
        action: 'escala',
        callback: enter('dutyScaleScene')
    },
    {
        action: 'protocolos',
        callback: enter('protocolsScene')
    }
]

const mainMenuOptions = async (ctx,next) => {
    const finalText = commands
        .map((item) => item.command)
        .reduce(
            (acc, item) => `${acc}\n /${item}`,
            `Escolha uma das opção abaixo:`
        )
    ctx.reply(finalText, k)
}

module.exports = {
    commands,
    actions,
    mainMenuOptions
}