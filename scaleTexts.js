
const getScaleText = (specialty) =>
{
    const textsOptions ={
        "ortopedia":getOrtopediaText,
        "ecocardiografia": getEcoText,
        "mão": getMaoText
    }
    
    const getOrtopediaText = `
    Ecala de Sobreaviso da Ortopedia:
    Segunda: Sergio Gurgel
    Terça: Andre Teixeira
    Quarta: Carlos Henrique
    Quinta: Segio Gurgel
    Sexta: Andre Teixeira
    Sábado: Sergio Gurgel
    Domingo: Andre Teixeira`

    const getEcoText = `
    Ecala de Sobreaviso da Ortopedia:
    Segunda: Cinara
    Terça: Taciana
    Quarta: Roberto
    Quinta:Cinara
    Sexta: Taciana
    Sábado: Cinara
    Domingo: Taciana`

    const getMaoText =`
    Segunda: André Teixeira
    Terca: Sergio Gurgel
    Quarta: Andre Teixiera
    Quinta: Andre Teixeira 
    Sexta: Sergio Gurgel
    Sábado:  Andre Teixeira 
    Domingo: Sergio Gurgel`

    return textsOptions[specialty]| "Ops"
}

module.exports = getScaleText