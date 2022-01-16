class Utils {
    static modifyString(string) {
        if(string){
        const newString = string
            .toString()
            .replaceAll(' ', '_')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        return newString}
    return ""
    }
}

module.exports = Utils
