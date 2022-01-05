const { flatMap, uniqBy, flatten } = require('lodash')
const db = require('./scales.json')

module.exports = {
    db: () => db,
    getSpecialties: () =>
        db.map((x) => x.specialty).sort((a, b) => a.localeCompare(b)),
    getSubspecialties: () => {
        const subspecialties = flatMap(db, (x) =>
            x.professionals.map((y) => y.subSpecialties ?? [])
        )
        return uniqBy(flatten(subspecialties), 'specialty').sort((a, b) =>
            a.specialty < b.specialty ? -1 : 1
        )
    },
}
