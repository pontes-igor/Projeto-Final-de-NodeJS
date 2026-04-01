const { repositoryFactory } = require('../repositories/factory');

async function createTransaction(input) {
  const { contasRepository, transacoesRepository } = repositoryFactory();

  const { contaId, valor, tipo, dataTransacao } = input;
  if (!contaId || valor === undefined || !tipo) {
    throw new Error('contaId, valor e tipo são obrigatórios');
  }

  // Busca a conta
  const conta = await contasRepository.findById(contaId);
  if (!conta) {
    throw new Error('Conta não encontrada');
  }

  let novoSaldo;
  if (tipo === 'credito') {
    novoSaldo = conta.saldo + valor;
  } else if (tipo === 'debito') {
    if (conta.saldo < valor) {
      throw new Error('Saldo insuficiente');
    }
    novoSaldo = conta.saldo - valor;
  } else {
    throw new Error('Tipo inválido. Use "credito" ou "debito"');
  }

  await contasRepository.updateSaldo(contaId, novoSaldo);

  const transaction = await transacoesRepository.create({
    contaId,
    valor,
    tipo,
    dataTransacao: dataTransacao || new Date().toISOString()
  });

  console.log(`Olá ${conta.usuario}, seu novo saldo é R$ ${novoSaldo}`);

  return transaction;
}

module.exports = { createTransaction };