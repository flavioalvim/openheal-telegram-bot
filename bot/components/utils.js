
class Utils {

    static modifyString (string)
    {
        const newString = string
        .toString()
        .replace(" ","_")
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
    return newString
    }
}

module.exports = Utils