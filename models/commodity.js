import mongoose from 'mongoose'
import commoditySchema from '../schemas/commodity'

module.exports = mongoose.model('Commodity',commoditySchema);