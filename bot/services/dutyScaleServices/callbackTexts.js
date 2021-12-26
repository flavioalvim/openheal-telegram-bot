const { keyboard } = require('telegraf/markup')
const db= require('./database')
const getCorrectKeyboard =require ('./keyboards')
const getSubSpecialtiesArray = require('./utils.js')


const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

// const getCommonCallbackText = (specialty) => {return ((ctx)=>
// {   
//     const professionals = db()
//         .filter(item => item.specialty ==  specialty)
//         .map(item => item.professionals)
//         .reduce((acc,item) => ({...acc, ...item}))

//     const telephonesText = professionals.reduce((acc,{name, telephones}) => (`${acc}${name} - ${telephones.reduce((acc,{telephone})=>(`${acc}${telephone}\n`),"")}\n`), `Lista de telefones - ${specialty}\n\n`)
    
//     ctx.reply(telephonesText, getCorrectKeyboard(specialty))

//  })}

const getCommonCallbackText = (specialty) => {return ((ctx)=>
    {   
        
        const professionals = db()
            .filter(item => item.specialty ==  specialty)
            .map(item => item.professionals)
            .reduce((acc,item) => ({...acc, ...item}))

        function getTelephones(telephones){return (telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,''))} 


        const subSpecialty = getSubSpecialtiesArray(specialty)
        //console.log(subSpecialty)

        if(subSpecialty !== false){
            console.log("entrou")
            const filterBySpecialty =  subSpecialty
                .map(element => (
                    {"subSpecialty": element ,
                    "professionals": professionals
                        .filter(item => item.subSpecialty.includes(element))}
                        ))

            const getProfessionalsText = (professionals) => professionals.reduce((acc,{name, telephones})=> `${acc}${name} - ${getTelephones(telephones)}\n`,"")
                            
            const innerText = filterBySpecialty.reduce((acc,{subSpecialty,professionals}) =>`${acc}*${subSpecialty}*\n\n${getProfessionalsText(professionals)}\n\n`,"")

            //console.log(innerText)    

            ctx.replyWithMarkdown(`*Telefones - ${specialty}*\n ${innerText}`, getCorrectKeyboard(specialty))
        }else{
            console.log(professionals)

            const telephonesText = professionals.reduce((acc,{name, telephones}) => `${acc}${name} - ${getTelephones(telephones)}\n`, `Lista de telefones - ${specialty}\n\n`)
        
            ctx.replyWithMarkdown(telephonesText,getCorrectKeyboard(specialty))

}})}

        



const getSpecialtiesText = () => {
    const getSpecialties = () => db().map(item => item.specialty)
    return (getSpecialties().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:"))
} //String



const getScaleText = (ctx) => {

    ctx.replyWithContact("+5521992218007", "FlavioAlvim",)


    ctx.replyWithMarkdown(`
    #Cabeçalho#
    ##Segunda linha##

    Texto simples
    *Negrito*
    _Negrito_
    [Telefone - 992218007](+5521992218007)
    `)
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
    getScaleText,
    getCommonCallbackText,
    getMainScene}
