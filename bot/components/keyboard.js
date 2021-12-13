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

        const buttons = this.buttons_obj.map(({text, action}) => new Button(text , action))
        const keyboard = Extra.markup(Markup.inlineKeyboard(buttons, {columns: this.columns}))
        return keyboard
    }

}

class KeyboardFromArray{
    constructor (array, columns =1){
        this.buttons_obj = array.map(item => ({text:item, action:item}))
        this.columns = columns
        
        return new Keyboard (this.buttons_obj, this.columns)
    }
}

module.exports = {
    Keyboard,
    KeyboardFromArray
}



