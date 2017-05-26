const Chai = require("chai");
const should = Chai.should();
const expect = Chai.expect;
const Sinon = require("sinon");

const Randomly = require("../index");

describe("Randomly", function() {
    describe("select()", () => {
        it("should throw an error when called with no arguments", (done) => {
            (() => {
                Randomly.select();
            }).should.throw(Error, /please provide a non-empty array/);
            done();
        });

        it("should throw an error when argument is not an array", (done) => {
            (() => {
                Randomly.select({});
            }).should.throw(Error, /please provide a non-empty array/);
            done();
        });

        it("should throw an error when argument is an empty array", (done) => {
            (() => {
                Randomly.select([]);
            }).should.throw(Error, /please provide a non-empty array/);
            done();
        });

        it("should throw an error when entries in the array do not have either the 'chance' or 'result' field", (done) => {
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
            done();
        });

        it("should throw an error when a 'chance' field is not a number", (done) => {
            (() => {
                Randomly.select([{
                    chance: {}, result: {}
                }]);
            }).should.throw(Error, /'chance' must be a positive number/);
            done();
        });

        it("should throw an error when a 'chance' field is a negative number", (done) => {
            (() => {
                Randomly.select([{
                    chance: -1, result: {}
                }]);
            }).should.throw(Error, /'chance' must be a positive number/);
            done();
        });

        it("should throw an error when all chances add up to zero", (done) => {
            (() => {
                Randomly.select([{
                    chance: 0, result: {},
                }, {
                    chance: 0, result: {},
                }]);
            }).should.throw(Error, /all results have zero weight/);
            done();
        });

        it("should return an entry when given a valid array", (done) => {
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
            done();
        });

        it("shouldn't throw an error when a result has zero chance", (done) => {
            Randomly.select([{
                    chance: 0, result: "a"
                }, {
                    chance: 1, result: "b"
                }
            ]).should.equal("b");
            done();
        });
    });
});
