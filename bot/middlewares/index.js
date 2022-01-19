const rfr = require('rfr')
const graceMiddleware = require('./graceMiddleware')
const crusadeMiddleware = require('./crusadeMiddleware')
const heartMiddleware = require('./heartMiddleware')
const { dutyScaleScene } = rfr('bot/modules/dutyScale/scene/dutyScale')
const { protocolsScene } = require('./scenes/protocols')

module.exports = {
    graceMiddleware,
    crusadeMiddleware,
    heartMiddleware,
    dutyScaleScene,
    protocolsScene
}
