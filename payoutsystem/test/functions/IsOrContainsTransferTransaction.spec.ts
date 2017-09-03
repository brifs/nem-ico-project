import {TransferTransaction} from "nem-library/dist/src/models/transaction/TransferTransaction";
import {TimeWindow} from "nem-library/dist/src/models/transaction/TimeWindow";
import {Account, Address, NEMLibrary, PublicAccount, XEM} from "nem-library";
import {EmptyMessage} from "nem-library/dist/src/models/transaction/PlainMessage";
import {expect} from "chai";
import {IsOrContainsTransferTransaction} from "../../src/functions/IsOrContainsTransferTransaction";
import {MultisigTransaction} from "nem-library/dist/src/models/transaction/MultisigTransaction";
import {NetworkTypes} from "nem-library/dist/src/models/node/NetworkTypes";
import {
    ImportanceMode,
    ImportanceTransferTransaction
} from "nem-library/dist/src/models/transaction/ImportanceTransferTransaction";

describe("IsOrContainsTransferTransaction", () => {

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

    it("should return true when it's a TransferTransaction", () => {
        expect(IsOrContainsTransferTransaction(transferTransaction)).to.be.true;
    });

    it("should return true when it's a MultisigTransaction and it contains a TransferTransaction", () => {
        let multisig = MultisigTransaction.create(
            TimeWindow.createWithDeadline(),
            transferTransaction,
            publicAccount,
        );
        expect(IsOrContainsTransferTransaction(multisig)).to.be.true;
    });

    it("should return false when it's not a TransferTransaction", () => {
        expect(IsOrContainsTransferTransaction(importanceTransaction)).to.be.false;
    });

    it("should return false when it's a MultisigTranscation and it does not contain a TransferTransaction", () => {
        let multisig = MultisigTransaction.create(
            TimeWindow.createWithDeadline(),
            importanceTransaction,
            publicAccount,
        );
        expect(IsOrContainsTransferTransaction(multisig)).to.be.false;
    });
});