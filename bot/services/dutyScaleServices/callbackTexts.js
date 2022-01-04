//const { keyboard } = require('telegraf/markup')
const {db}= require('./database')
const getCorrectKeyboard =require ('./keyboards')
//const {getSubSpecialtiesArray, getUnicObjectSpecialties} = require('./utils.js/index.js')
const fs = require ('fs')

const getSubSpecialtiesArray = (specialty) => {

    try
    {
    const filter = db()
    .filter(item => item.specialty === specialty )
    .map( item => item.professionals)
    .reduce((acc,item)=>([...acc , ...item]),[])
    .map(item=>item.subSpecialties)
    .reduce((acc,item)=>([...acc , ...item]),[])
    .map(item =>item.specialty)
        
    console.log([...new Set(filter)])
    return ([...new Set(filter)])
    
    }
    catch
    {
        console.log("Parece que essa especialidade nao tem subespecialidades")
        return []
    }}


    const getSpecialtiesArray = () => db().map(({specialty}) => specialty).sort()

    //recebe um array de objetos {specialty, scaleMdFile} com repetidos e devolve um array de objetos unicos

    const getUnicObjectSpecialties = (arrayOfObjects) =>
    {
        let specialtyArray =[]
        const unicObjectSpecialties = arrayOfObjects.filter(({specialty,scaleMdFile}) => 
        {
            if (!specialtyArray.includes(specialty)) 
            {
                specialtyArray.push(specialty)
                return ({specialty : specialty, scaleMdFile : scaleMdFile})
            }
        })
    return unicObjectSpecialties
    }

const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

//funcoes utils

//Retorna array de profissionais por especialidade

const getProfessionals = (specialty) =>{
    const professionals = db()
            .filter(item => item.specialty ==  specialty)
            .map(item => item.professionals)
            .reduce((acc,item) => ({...acc, ...item}))

    return professionals
}
//Exemplo objeto

// {
//     "specialty":"Clínica médica",
//     "professionals":[
//       {
//         "name": "Fulano de Tal",
//         "telephones": [{"telephone":"+555555-3954"}],
//         "subSpecialties": [
//                   {"specialty": "Quadril", "scaleMdFile" : "escalaQuadril"},/                 {"specialty": "Quadril", "scaleMdFile" : "escalaQuadril"}],
//         "teamProfessionals": [],
//         "id" : 1
//       },
//       {
//         "name": "Cicrano",
//         "telephones": [{"telephone":"+555555-2547"}],
//         "subSpecialties": [],
//         "teamProfessionals": [],
//         "id" : 3
//       }
//     ],
//     "scaleMdFile": "clinicaMedica"
// }

const getTelephonesString = (telephones) => telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,'')
const getProfessionalsString = (professionals) => professionals.reduce((acc,{name, telephones})=> `${acc}${name} - ${getTelephones(telephones)}\n`,"")


const getCommonCallback = (specialty) => {return ((ctx)=>
    {   
        
        const professionals = getProfessionals(specialty)
        const subSpecialtiesArray = getSubSpecialtiesArray(specialty)
        const professionalSubSpecialties = (professional) => professional.subSpecialties.map((item=>item.specialty))
    
       // const innerText = subSpecialtiesArray && professionals.reduce((acc,{subSpecialties,professionals}) =>`${acc}*${subSpecialties}*\n\n${getProfessionalsString(professionals)}\n\n`,"")   
        
        if (innerText) {ctx.replyWithMarkdown(`*Telefones - ${specialty}*\n ${innerText}`, getCorrectKeyboard("seeSubScale",specialty))}
        else { //console.log(professionals)
            const telephonesText = professionals.reduce((acc,{name, telephones}) => `${acc}${name} - ${getTelephonesString(telephones)}\n`, `*Lista de telefones - ${specialty}*\n\n`)
            ctx.replyWithMarkdown(telephonesText,getCorrectKeyboard("seeScale",specialty))}

})}

const getSpecialtiesText = () => {
    const getSpecialties = () => db().map(({specialty}) => 
    {
        const string = specialty
                        .toString()
                        .replace(" ","_")
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "")
        return string
        })
    return (getSpecialties().sort().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:"))
} //String


//Acertar se o arquivo nao existir
function getScaleCallback (filename) 
{
    
    return ((ctx) => 
    {
        try
        {   
            const mdFile = fs.readFileSync(__dirname + '/mdFiles/'+ `${filename}.md`).toString()
            console.log(mdFile)
            ctx.replyWithMarkdown(mdFile,getCorrectKeyboard("return"))
        }
        catch
        {
            ctx.reply("Não há escala para essa especialidade.",getCorrectKeyboard("return"))
        }
    })
}


const getSubSpecialtiesTelephonesTextCallback = (specialty, subSpecialties,keyboard) => {
    const text = db()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .filter(item => item.subSpecialties.includes(subSpecialties))
        .reduce((acc, {name, telephones}) => `${acc}${name} - ${telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,"")}\n`,`${specialty} - ${subSpecialties}\n\n`)


        return (ctx) => ctx.reply(text, keyboard)
}



module.exports = {getSpecialtiesText, 
    getSubSpecialtiesTelephonesTextCallback, 
    getScaleCallback,
    getCommonCallback,
    getMainScene}