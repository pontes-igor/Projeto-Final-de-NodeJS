const express = require('express');
const router = express.Router();
const  {createTransaction}  = require('../usecases/createTransactionUseCase') 
const { repositoryFactory } = require('../repositories/factory')

router.post('/criar-transacao', async (request, response) => {
   try {
        const { contaId, valor, tipo, dataTransacao } = request.body;
        const transaction = await createTransaction({ contaId, valor, tipo, dataTransacao });
        return response.status(201).json(transaction);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});
router.get('/transcacao', (request, response) => {
    return response.send('Transação encontrada com sucesso!')
})

router.get('/contas/all', (request, response) => {
    const { contasRepository } = repositoryFactory()
    const contas = contasRepository.findAll()
    return response.json(contas)
})

router.get('/transacao/all', (request, response) => {
    const { transacoesRepository } = repositoryFactory()
    const transacoes = transacoesRepository.findAllTransacoes()
    return response.json(transacoes)
})

router.get('/transacao/:id', (request, response) => {
    return response.send('ID encontrado!')
})

router.post('/transacao', (request, response) => {
    return response.send('Transação realizada com sucesso!')
})

router.put('/transacao/:id/editar', (request, response) => {
    const { id } = request.params
    const { transacoesRepository } = repositoryFactory()
    const transacao = transacoesRepository.findById(id)
    if (!transacao) return response.status(404).json({ error: 'Transação não encontrada' })
     const { valor, dataTransacao } = request.body
    if (valor !== undefined) transacao.valor = valor
    if (dataTransacao !== undefined) transacao.dataTransacao = dataTransacao

    transacoesRepository.updateTransacao(transacao)
    return response.send('Transação atualizada com sucesso!')
})

router.delete('/transacao/:id/status/cancel', (request, response) => {
    const { id } = request.params
    const { transacoesRepository, contasRepository } = repositoryFactory()
    const deleted = transacoesRepository.deleteTransacao(id)
    if (!deleted) return response.status(404).json({ error: 'Transação não encontrada' })

    const conta = contasRepository.findById(deleted.contaId)
    if (conta) {
        const saldoRevertido = deleted.tipo === 'credito'
            ? conta.saldo - deleted.valor
            : conta.saldo + deleted.valor
        contasRepository.updateSaldo(deleted.contaId, saldoRevertido)
    }

    return response.status(200).json(deleted)
})

module.exports = {router}