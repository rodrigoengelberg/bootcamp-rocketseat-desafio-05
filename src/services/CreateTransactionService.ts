import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {

    const userBalance = this.transactionsRepository.getBalance()

    if (transaction.type === 'outcome' && (transaction.value > userBalance.total)) {
        throw Error('This operation is not available');
    }

    return this.transactionsRepository.create(transaction)
  }
}

export default CreateTransactionService
