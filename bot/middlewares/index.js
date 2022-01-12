const graceMiddleware = require('./graceMiddleware')
const crusadeMiddleware = require('./crusadeMiddleware')
const heartMiddleware = require('./heartMiddleware')
const { dutyScaleScene } = require('./scenes/dutyScale')
const { protocolosCovidScene } = require('./scenes/protocolosCovidScene')

module.exports = {
    graceMiddleware,
    crusadeMiddleware,
    heartMiddleware,
    dutyScaleScene,
    protocolosCovidScene
}
