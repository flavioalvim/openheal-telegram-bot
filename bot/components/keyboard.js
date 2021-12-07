const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

class Button {
    constructor(text, action){
        this.text = text
        this.action = action

        return(Markup.callbackButton(text, action))
    }
}

class Keyboard {

    constructor(buttons_obj, columns = 1){

        this.buttons_obj = buttons_obj
        this.columns = columns

        //console.log (this.buttons_obj)

        const buttons = this.buttons_obj.map(({text, action}) => new Button(text , action))
        //console.log(buttons)

        const keyboard = Extra.markup(Markup.inlineKeyboard(buttons, {columns: this.columns}))
        //console.log(keyboard)
        //console.log(this.columns)

        return keyboard
    }
}

module.exports = Keyboard


