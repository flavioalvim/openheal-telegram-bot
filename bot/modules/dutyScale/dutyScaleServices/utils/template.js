const fs = require('fs')
const mustache = require('mustache')
const dir = 'bot/modules/dutyScale/layouts'

/**
 * Ler o template do markdown
 */
const loadMarkdownFile = (fileName) => {
    const file = `${dir}/${fileName}.md`
    return fs.readFileSync(file, 'utf8')
}

/**
 * Renderizar o template do markdown utilizando o Mustache
 */
const renderTemplateMarkdown = (fileName, data) => {
    const file = loadMarkdownFile(fileName)
    return mustache.render(file, data)
}

module.exports = { 
    loadMarkdownFile,
    renderTemplateMarkdown,
}
