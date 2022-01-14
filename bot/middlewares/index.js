const graceMiddleware = require('./graceMiddleware')
const crusadeMiddleware = require('./crusadeMiddleware')
const heartMiddleware = require('./heartMiddleware')
const { dutyScaleScene } = require('./scenes/dutyScale')
const { protocolsScene } = require('./scenes/protocols')

module.exports = {
    graceMiddleware,
    crusadeMiddleware,
    heartMiddleware,
    dutyScaleScene,
    protocolsScene
}
