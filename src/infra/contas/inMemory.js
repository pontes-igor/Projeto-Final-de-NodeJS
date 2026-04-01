const {v4: uuidv4} = require('uuid')

const database = [
    {
        id: uuidv4(),
        conta: 'Poupança',
        usuario: 'João',
        saldo: 1000,
        data: new Date()
    },
    {
        id: uuidv4(),
        conta: 'Corrente',
        usuario: 'Maria',
        saldo: 1500,
       data: new Date()
    },

    {
        id: uuidv4(),
        conta: 'Investimento',
        usuario: 'Carlos',
        saldo: 5000,
       data: new Date() 

    }
]

module.exports = { database }