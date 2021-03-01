import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {

    const totalIncome = this.transactions.reduce((accum, curr) => curr.type === 'income' ? accum + curr.value : accum, 0)

    const totalOutcome = this.transactions.reduce((accum, curr) => curr.type === 'outcome' ? accum + curr.value : accum, 0)

    const total = totalIncome - totalOutcome

    return { income: totalIncome, outcome: totalOutcome, total }
  }

  public create({ title, value, type }: Transaction): Transaction {

    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
