const contasData = require('../infra/contas/inMemory');
const transacoesData = require('../infra/contas/transacoes/inMemory');
const ContasRepository = require('./ContasRepositoriesInMemory');
const TransacoesRepository = require('./TransacoesRepositoryInMemory');

function repositoryFactory() {
  const contasRepository = new ContasRepository(contasData);
  const transacoesRepository = new TransacoesRepository(transacoesData);
  return { contasRepository, transacoesRepository };
}

module.exports = { repositoryFactory };