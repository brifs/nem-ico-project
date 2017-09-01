import { MosaicTransferable, MosaicId, MosaicProperties } from "nem-library";

export class WowTestMosaic extends MosaicTransferable {

    constructor(amount: number) {
        super(new MosaicId("nemtesting", "wow-so-much-testing"),
            new MosaicProperties(0, 9000000, true, false),
            amount);
    }
}