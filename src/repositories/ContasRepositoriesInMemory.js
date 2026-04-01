const { v4: uuidv4 } = require('uuid');
const { database } = require('../infra/contas/inMemory');
const transacoes = require('../infra/contas/transacoes/inMemory');
const TransacoesRepository = require('./TransacoesRepositoryInMemory');


class ContasRepositoriesInMemory {
  constructor() {
    this.database = database;
    this.transacoesRepository = new TransacoesRepository(transacoes);
  }

  findAll() {
    return this.database;
  }

  create(conta) {
    const id = uuidv4();
    const newConta = { id, ...conta };
    this.database.push(newConta);
    return newConta;
  }

  createTransacao({ contaId, valor, dataTransacao }) {
    const id = uuidv4();
    const transacao = {
      id,
      contaId,
      valor,
      dataTransacao: dataTransacao || new Date().toISOString(),
    };
    this.database.forEach((conta) => {
      if (conta.id === contaId) {
        conta.saldo += valor;
      }
    });
    this.database.push(transacao);
    return transacao;
  }

  findById(id) {
    return this.database.find((conta) => conta.id === id);
  }

  updateSaldo(id, saldo) {
    const conta = this.database.find((conta) => conta.id === id);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }
    conta.saldo = saldo;
    return conta;
  }

  delete(id) {
    const index = this.database.findIndex((conta) => conta.id === id);
    if (index === -1) {
      throw new Error('Conta não encontrada');
    }
    const [deleted] = this.database.splice(index, 1);
    return deleted;
  }
}

module.exports = ContasRepositoriesInMemory;