const fs = require('fs')
const dir = __dirname + '/mdFiles';
const _ = require('lodash')



const fileContent = (fileName) =>  fs.readFileSync(__dirname + `/mdFiles/${fileName}`).toString()

const upperCaseAndRemoveUnder = (string) => {
    const newString = _.capitalize(string)
        .replaceAll("_", " ")
        .trim()
        .replace(/\.[^/.]+$/, "")

    return newString
}

const removeExtension = (string = String) => string.toString().replace(/\.[^/.]+$/, "")

const db = () => {
    const files = fs.readdirSync(dir)
    if (!files) { return [] } else {
        return(
        files.map(filename => ({
            filename,
            "text": upperCaseAndRemoveUnder(filename),
            "action": removeExtension(filename),
            "content": fileContent(filename)
        })))
    }
}

module.exports = db