import {
    NEMLibrary, NetworkTypes, Account, ConfirmedTransactionListener, TransactionTypes, TransferTransaction, TimeWindow, PlainMessage, TransactionHttp
} from "nem-library";
import { WowTestMosaic } from "./models/WowTestMosaic";

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
declare let process: any;

const privateKey: string = process.env.PRIVATE_KEY;
const account = Account.createWithPrivateKey(privateKey);

const transactionHttp = new TransactionHttp();

new ConfirmedTransactionListener().given(account.address)
    .map((_) => {
        console.log("\nCONFIRMED TRANSACTION", _);
        return _;
    })
    .filter((_) => _.type == TransactionTypes.TRANSFER)
    .filter((_) => _.signer!.address.plain() != account.address.plain())
    .map((_: TransferTransaction) => {
        const amount = Math.min(_.amount / 1000000, 10);
        return TransferTransaction.createWithMosaics(
            TimeWindow.createWithDeadline(),
            _.signer!.address,
            [new WowTestMosaic(amount)],
            PlainMessage.create("Thanks to send some XEM Test! https://github.com/aleixmorgadas/nem-ico-example")
        )
    })
    .map((_) => account.signTransaction(_))
    .flatMap((_) => transactionHttp.announceTransaction(_))
    .subscribe((_) => {
        console.log("Successfully", _)
    });

console.log("APPLICATION STARTED");
console.log("Listening " + account.address.pretty() + " account");