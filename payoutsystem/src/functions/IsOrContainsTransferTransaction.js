"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionTypes_1 = require("nem-library/dist/src/models/transaction/TransactionTypes");
function IsOrContainsTransferTransaction(transaction) {
    var isTransactionInsideMultisig = false;
    if (transaction.type == TransactionTypes_1.TransactionTypes.MULTISIG) {
        isTransactionInsideMultisig = transaction.otherTransaction.type == TransactionTypes_1.TransactionTypes.TRANSFER;
    }
    return transaction.type == TransactionTypes_1.TransactionTypes.TRANSFER || isTransactionInsideMultisig;
}
exports.IsOrContainsTransferTransaction = IsOrContainsTransferTransaction;
