import {TransferTransaction} from "nem-library/dist/src/models/transaction/TransferTransaction";
import {Address, NEMLibrary, PublicAccount, XEM} from "nem-library";
import {NetworkTypes} from "nem-library/dist/src/models/node/NetworkTypes";
import {EmptyMessage} from "nem-library/dist/src/models/transaction/PlainMessage";
import {TimeWindow} from "nem-library/dist/src/models/transaction/TimeWindow";
import {ExtractTransferTransaction} from "../../src/functions/ExtractTransferTransaction";
import {expect} from "chai";
import {MultisigTransaction} from "nem-library/dist/src/models/transaction/MultisigTransaction";
import {
    ImportanceMode,
    ImportanceTransferTransaction
} from "nem-library/dist/src/models/transaction/ImportanceTransferTransaction";

describe("ExtractTransferTransaction", () => {

    let transferTransaction: TransferTransaction;
    let importanceTransaction: ImportanceTransferTransaction;
    let publicAccount: PublicAccount;

    before(() => {
        NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
        publicAccount = PublicAccount.createWithPublicKey("0414fe7647ec008e533aac98a4bf1c5fbf1d236c75b81fdadf1f5d1042fdd2ff");
        transferTransaction = TransferTransaction.create(
            TimeWindow.createWithDeadline(),
            new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K"),
            new XEM(5),
            EmptyMessage
        );
        importanceTransaction = ImportanceTransferTransaction.create(
            TimeWindow.createWithDeadline(),
            ImportanceMode.Activate,
            publicAccount
        );
    });

    after(() => {
        NEMLibrary.reset();
    });

    it("should return the same transaction if it's a TransferTransaction", () => {
        expect(ExtractTransferTransaction(transferTransaction)).to.be.equal(transferTransaction);
    });

    it("should return the other transaction when it's a multisig and contains a transfer transaction", () => {
        let multisig = MultisigTransaction.create(
            TimeWindow.createWithDeadline(),
            transferTransaction,
            publicAccount,
        );
        expect(ExtractTransferTransaction(multisig)).to.be.equal(transferTransaction);
    });

    it("should throw error when the it's not a transfer transaction", () => {
       expect(() => {
            ExtractTransferTransaction(importanceTransaction)
       }).to.throw(Error);
    });

    it("should throw error when the multisig contains a transaction that it is not transfer transaction", () => {
        let multisig = MultisigTransaction.create(
            TimeWindow.createWithDeadline(),
            importanceTransaction,
            publicAccount,
        );
       expect(() => {
           ExtractTransferTransaction(multisig)
       }).to.throw(Error);
    });
});