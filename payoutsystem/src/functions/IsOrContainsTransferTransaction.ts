import {Transaction} from "nem-library/dist/src/models/transaction/Transaction";
import {TransactionTypes} from "nem-library/dist/src/models/transaction/TransactionTypes";
import {MultisigTransaction} from "nem-library/dist/src/models/transaction/MultisigTransaction";

export function IsOrContainsTransferTransaction(transaction: Transaction): boolean {
    let isTransactionInsideMultisig = false;
    if (transaction.type == TransactionTypes.MULTISIG) {
        isTransactionInsideMultisig = (transaction as MultisigTransaction).otherTransaction.type == TransactionTypes.TRANSFER;
    }
    return transaction.type == TransactionTypes.TRANSFER || isTransactionInsideMultisig;
}