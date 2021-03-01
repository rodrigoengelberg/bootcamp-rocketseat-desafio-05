import { Router } from 'express'
import Transaction from '../models/Transaction'

import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'

const transactionRouter = Router()

const transactionsRepository = new TransactionsRepository()

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()

    return response.json({transactions, balance: transactionsRepository.getBalance()})
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const transaction = new Transaction(request.body)

    const createTransaction = new CreateTransactionService(transactionsRepository)

    const transactionCreated = createTransaction.execute(transaction)

    return response.json(transactionCreated)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default transactionRouter