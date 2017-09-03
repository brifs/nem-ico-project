import {TransferTransaction} from "nem-library/dist/src/models/transaction/TransferTransaction";
import {TimeWindow} from "nem-library/dist/src/models/transaction/TimeWindow";
import {Address, NEMLibrary, PublicAccount, XEM} from "nem-library";
import {EmptyMessage} from "nem-library/dist/src/models/transaction/PlainMessage";
import {expect} from "chai";
import {ICOPayment} from "../../src/functions/ICOPayment";
import {NetworkTypes} from "nem-library/dist/src/models/node/NetworkTypes";

describe("ICOPayment", () => {

    before(() => {
        NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    });

    after(() => {
        NEMLibrary.reset();
    });

    it("should return the same amount receive if it's less than 10", () => {
       let transaction = TransferTransaction.create(
           TimeWindow.createWithDeadline(),
           new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K"),
           new XEM(2),
           EmptyMessage
       );
       transaction.signer = PublicAccount.createWithPublicKey("0414fe7647ec008e533aac98a4bf1c5fbf1d236c75b81fdadf1f5d1042fdd2ff");
       let payoutTransaction = ICOPayment(transaction);
       expect(payoutTransaction.mosaics![0].quantity).to.be.equal(2);
    });



    it("should return 10 if it's more than 10 xem are received", () => {
        let transaction = TransferTransaction.create(
            TimeWindow.createWithDeadline(),
            new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K"),
            new XEM(22),
            EmptyMessage
        );
        transaction.signer = PublicAccount.createWithPublicKey("0414fe7647ec008e533aac98a4bf1c5fbf1d236c75b81fdadf1f5d1042fdd2ff");
        let payoutTransaction = ICOPayment(transaction);
        expect(payoutTransaction.mosaics![0].quantity).to.be.equal(10);
    });
});