const Chai = require("chai");
const should = Chai.should();
const expect = Chai.expect;
const Sinon = require("sinon");

const Randomly = require("../index");

describe("Randomly", function() {
    describe("select()", () => {
        it("should throw an error when called with no arguments", () => {
            (() => {
                Randomly.select();
            }).should.throw(Error, /please provide a non-empty array/);
        });

        it("should throw an error when argument is not an array", () => {
            (() => {
                Randomly.select({});
            }).should.throw(Error, /please provide a non-empty array/);
        });

        it("should throw an error when argument is an empty array", () => {
            (() => {
                Randomly.select([]);
            }).should.throw(Error, /please provide a non-empty array/);
        });

        it("should throw an error when entries in the array do not have either the 'chance' or 'result' field", () => {
            (() => {
                Randomly.select([{
                    result: {}
                }]);
            }).should.throw(Error, /each array entry must be an object with 'chance' and 'result' properties/);
            (() => {
                Randomly.select([{
                    chance: 1
                }]);
            }).should.throw(Error, /each array entry must be an object with 'chance' and 'result' properties/);
        });

        it("should throw an error when a 'chance' field is not a number", () => {
            (() => {
                Randomly.select([{
                    chance: {}, result: {}
                }]);
            }).should.throw(Error, /'chance' must be a positive number/);
        });

        it("should throw an error when a 'chance' field is a negative number", () => {
            (() => {
                Randomly.select([{
                    chance: -1, result: {}
                }]);
            }).should.throw(Error, /'chance' must be a positive number/);
        });

        it("should throw an error when all chances add up to zero", () => {
            (() => {
                Randomly.select([{
                    chance: 0, result: {},
                }, {
                    chance: 0, result: {},
                }]);
            }).should.throw(Error, /all results have zero weight/);
        });

        it("should return an entry when given a valid array", () => {
            Sinon.stub(Math, "random").returns(0.4);
            Randomly.select([{
                    chance: 1, result: "a"
                }, {
                    chance: 1, result: "b"
                }
            ]).should.equal("a");
            Randomly.select([{
                    chance: 1, result: "a"
                }, {
                    chance: 2, result: "b"
                }
            ]).should.equal("b");
        });

        it("shouldn't throw an error when a result has zero chance", () => {
            Randomly.select([{
                    chance: 0, result: "a"
                }, {
                    chance: 1, result: "b"
                }
            ]).should.equal("b");
        });
            it("shouldn't throw an error when a result has Infinity chance", () => {
            Randomly.select([{
                    chance: Infinity, result: 9
                }, {
                    chance: 6, result: 19
                }
            ]).should.equal(9);
        });
    });
});
