const graceMiddleware = require('./graceMiddleware')
const crusadeMiddleware = require('./crusadeMiddleware')
const heartMiddleware = require('./heartMiddleware')
const { dutyScaleScene } = require('./scenes/dutyScale')
<<<<<<< Updated upstream
const { protocolosCovidScene } = require('./scenes/protocolosCovidScene')
=======
const { protocolsScene } = require('./scenes/protocols')
>>>>>>> Stashed changes

module.exports = {
    graceMiddleware,
    crusadeMiddleware,
    heartMiddleware,
    dutyScaleScene,
<<<<<<< Updated upstream
    protocolosCovidScene
=======
    protocolsScene
>>>>>>> Stashed changes
}
