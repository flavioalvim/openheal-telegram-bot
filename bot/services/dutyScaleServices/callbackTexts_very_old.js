
const {db}= require('./database')
const getCorrectKeyboard =require ('./keyboards')
const {getSubSpecialtiesArray, getUnicObjectSpecialties} = require('./utils')
const fs = require ('fs')



const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

const getCommonCallback = (specialty) => {return ((ctx)=>
    {   
        
        const professionals = db()
            .filter(item => item.specialty ==  specialty)
            .map(item => item.professionals)
            .reduce((acc,item) => ({...acc, ...item}))

        function getTelephones(telephones){return (telephones.reduce((acc,{telephone})=>`${acc}${telephone}\n`,''))} 
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
            ctx.replyWithMarkdown(mdFile,getCorrectKeyboard("return"))
        }
        catch
        {
            ctx.reply("Não há escala para essa especialidade.",getCorrectKeyboard("return"))
        }
    })
}



module.exports = {getSpecialtiesText, 
    getScaleCallback,
    getCommonCallback,
    getMainScene}