const { keyboard } = require('telegraf/markup')
const db= require('./database')
const getCorrectKeyboard =require ('./keyboards')
const getSubSpecialtiesArray = require('./utils.js')
const fs = require ('fs')



const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

const getCommonCallback = (specialty) => {return ((ctx)=>
    {   
        
        const professionals = db()
            .filter(item => item.specialty ==  specialty)
            .map(item => item.professionals)
            .reduce((acc,item) => ({...acc, ...item}))

        function getTelephones(telephones){return (telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,''))} 


        const subSpecialty = getSubSpecialtiesArray(specialty)
        //console.log(subSpecialty)

        if(subSpecialty.length>0){
            const filterBySpecialty =  subSpecialty
                .map(element => (
                    {"subSpecialty": element ,
                    "professionals": professionals
                        .filter(item => item.subSpecialty.includes(element))}
                        ))

            const getProfessionalsText = (professionals) => professionals.reduce((acc,{name, telephones})=> `${acc}${name} - ${getTelephones(telephones)}\n`,"")
                            
            const innerText = filterBySpecialty.reduce((acc,{subSpecialty,professionals}) =>`${acc}*${subSpecialty}*\n\n${getProfessionalsText(professionals)}\n\n`,"")

            //console.log(innerText)    

            ctx.replyWithMarkdown(`*Telefones - ${specialty}*\n ${innerText}`, getCorrectKeyboard("seeSubScale",specialty))
        }else{
            //console.log(professionals)

            const telephonesText = professionals.reduce((acc,{name, telephones}) => `${acc}${name} - ${getTelephones(telephones)}\n`, `*Lista de telefones - ${specialty}*\n\n`)
        
            ctx.replyWithMarkdown(telephonesText,getCorrectKeyboard("seeScale",specialty))

}})}

const getSpecialtiesText = () => {
    const getSpecialties = () => db().map(item => item.specialty)
    return (getSpecialties().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:"))
} //String


//Acertar se o arquivo nao existir
function getScaleCallback (filename) 
{
    return ((ctx) => {
    const mdFile = fs.readFileSync(__dirname + '/mdFiles/'+ `${filename}.md`).toString()
    ctx.replyWithMarkdown(mdFile,getCorrectKeyboard("return"))
})
}


const getSubSpecialtyTelephonesTextCallback = (specialty, subSpecialty,keyboard) => {
    const text = db()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .filter(item => item.subSpecialty.includes(subSpecialty))
        .reduce((acc, {name, telephones}) => `${acc}${name} - ${telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,"")}\n`,`${specialty} - ${subSpecialty}\n\n`)


        return (ctx) => ctx.reply(text, keyboard)
}



module.exports = {getSpecialtiesText, 
    getSubSpecialtyTelephonesTextCallback, 
    getScaleCallback,
    getCommonCallback,
    getMainScene}