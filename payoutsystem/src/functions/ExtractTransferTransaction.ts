import {Transaction} from "nem-library/dist/src/models/transaction/Transaction";
import {TransferTransaction} from "nem-library/dist/src/models/transaction/TransferTransaction";
import {TransactionTypes} from "nem-library/dist/src/models/transaction/TransactionTypes";
import {MultisigTransaction} from "nem-library/dist/src/models/transaction/MultisigTransaction";

export function ExtractTransferTransaction(transaction: Transaction): TransferTransaction {
    if (transaction.type == TransactionTypes.TRANSFER) return transaction as TransferTransaction;
    else if (transaction.type == TransactionTypes.MULTISIG) {
        let otherTransaction = (transaction as MultisigTransaction).otherTransaction;
        if (otherTransaction.type == TransactionTypes.TRANSFER) return otherTransaction as TransferTransaction;
    }
    throw new Error("It is not a Transfer Transaction or Multisig or the Multisig does not contain a TransferTransaction")
}