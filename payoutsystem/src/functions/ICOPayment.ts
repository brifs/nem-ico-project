import {TransferTransaction} from "nem-library/dist/src/models/transaction/TransferTransaction";
import {TimeWindow} from "nem-library/dist/src/models/transaction/TimeWindow";
import {WowTestMosaic} from "../models/WowTestMosaic";
import {PlainMessage} from "nem-library/dist/src/models/transaction/PlainMessage";

export function ICOPayment(investorPayment: TransferTransaction): TransferTransaction {
    const amount = Math.min(investorPayment.amount / 1000000, 10);
    return TransferTransaction.createWithMosaics(
        TimeWindow.createWithDeadline(),
        investorPayment.signer!.address,
        [new WowTestMosaic(amount)],
        PlainMessage.create("Thanks to send some XEM Test! https://github.com/aleixmorgadas/nem-ico-example")
    )
}