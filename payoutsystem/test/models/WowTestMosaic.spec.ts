import {expect} from "chai";
import {WowTestMosaic} from "../../src/models/WowTestMosaic";

describe("WowTestMosaic", () => {

    // http://bob.nem.ninja:8765/#/mosaic/08cd566a6c8937ab758571cc4ae9ac43031aa41ce1135ec524a710cfbf914b9d/0
    it("should have the same description as the creation mosaic transaction", () => {
        const wowTest = new WowTestMosaic(5);
        expect(wowTest.amount).to.be.equal(5);
        expect(wowTest.properties.initialSupply).to.be.equal(9000000);
        expect(wowTest.properties.divisibility).to.be.equal(0);
        expect(wowTest.properties.transferable).to.be.true;
        expect(wowTest.properties.supplyMutable).to.be.false;
        expect(wowTest.levy).to.be.undefined;
    });
});