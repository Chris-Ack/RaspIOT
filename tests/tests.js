const { expect } = require("chai");
const avocadoFunction = require("../clienttemp/index");


// CLIENT TEST
describe ("avocadoFunction", () => {
    beforeEach(() => {
        makeAvocado = avocadoFunction();
    })
    it("should turn integers into avocados", () => {
        expect(makeAvocado(1).to.equal("🥑"));
    })
})

// OTHER TESTS