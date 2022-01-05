const fs = require('fs')
const mustache = require('mustache')

/**
 * Ler o template do markdown
 */
const loadMarkdownFile = (fileName) => {
    const file = `${__dirname}/../../../layouts/${fileName}.md`
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
