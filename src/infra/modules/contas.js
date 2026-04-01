const {Schema, model} = require('mongoose')

const ContaSchema = new Schema({
    conta: String,
    usuario: String,
    saldo: Number,
    data: { type: Date, default: Date.now }
})

module.exports = model('contas', ContaSchema)