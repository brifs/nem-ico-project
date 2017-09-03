import {
    NEMLibrary, NetworkTypes, Account, ConfirmedTransactionListener, TransactionTypes, TransferTransaction, TimeWindow, PlainMessage, TransactionHttp, MultisigTransaction
} from "nem-library";
import { WowTestMosaic } from "./models/WowTestMosaic";
import {Observable} from "rxjs";
import {IsOrContainsTransferTransaction} from "./functions/IsOrContainsTransferTransaction";
import {ExtractTransferTransaction} from "./functions/ExtractTransferTransaction";
import {ICOPayment} from "./functions/ICOPayment";

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
    .filter(IsOrContainsTransferTransaction)
    .map(ExtractTransferTransaction)
    .filter((_) => _!.signer!.address.plain() != account.address.plain())
    .map(ICOPayment)
    .map((_) => account.signTransaction(_))
    .flatMap((_) => transactionHttp.announceTransaction(_))
    .subscribe((_) => {
        console.log("Successfully", _)
    });

console.log("APPLICATION STARTED");
console.log("Listening " + account.address.pretty() + " account");