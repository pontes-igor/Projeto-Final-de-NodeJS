const {v4: uuidv4} = require('uuid')
const { database } = require('../infra/contas/inMemory')
const transacoes = require('../infra/contas/transacoes/inMemory')

class TransacoesRepositoryInMemory {
     constructor(transacoesArray) {
    this.transacoes = transacoesArray;
  }
    create({ contaId, valor, tipo, dataTransacao }) {
        const id = uuidv4()
        const transacao = { id, contaId, valor, tipo, dataTransacao }
        this.transacoes.push(transacao)
        return transacao
    }
    createTransacao (valor, dataTransacao) {
        const id = uuidv4()
        transacoes.push({ id, valor, dataTransacao })
    }
    deleteTransacao (id) {
        const index = this.transacoes.findIndex(transacao => transacao.id === id)
        if (index === -1) return null
        const [deleted] = this.transacoes.splice(index, 1)
        return deleted
    }
    findAllTransacoes () {
        console.log(transacoes)
        return transacoes
    }
    findById (id) {
        return this.transacoes.find(transacao => transacao.id === id)
    }
    updateTransacao (transacaoAtualizada) {
        const index = this.transacoes.findIndex(t => t.id === transacaoAtualizada.id)
        if (index === -1) return null
        this.transacoes[index] = transacaoAtualizada
        return this.transacoes[index]
    }
}

module.exports = TransacoesRepositoryInMemory