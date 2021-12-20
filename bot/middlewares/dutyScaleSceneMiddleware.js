const Scene = require ('telegraf/scenes/base')
const Stage = require ('telegraf/stage')
const {enter, leave} = Stage
const {KeyboardFromArray} = require ('../components/keyboard')
const fs = require('fs')

const dutyScaleScene = new Scene('dutyScaleScene') //Scene
const db = JSON.parse(fs.readFileSync ('../scales.json')) //Json
const specialties = db.map(item => item.specialty) //Array of Strings
const k = new KeyboardFromArray(specialties) //Keboard

const textoPadrao  = 'Essas são as ecalas de sobreaviso:\n/Ecocardiograma\n' //String

dutyScaleScene.enter(ctx=>ctx.reply(textoPadrao, k))
dutyScaleScene.leave(ctx=>ctx.reply("Saindo do mudulo escala. Digite algo para novas opções"))

module.exports = {dutyScaleScene}