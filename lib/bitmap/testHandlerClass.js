"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsHandler = void 0;
var testClass_1 = require("./testClass");
/*
    TestHandler contalins all the input examples.
    For example it might represent the following in the standard input:
        2
        3 4
        0001
        0011
        0110

        5 5
        00010
        00110
        01100
        00000
        00000
*/
var TestsHandler = /** @class */ (function () {
    function TestsHandler(testsNumber) {
        this.testsNumber = testsNumber;
        this.tests = [];
    }
    TestsHandler.prototype.testsComplete = function () {
        return this.tests.length === this.testsNumber && this.tests.every(function (test) { return test.isComplete(); });
        ;
    };
    TestsHandler.prototype.addTest = function (n, m) {
        this.tests.push(new testClass_1.Test(n, m));
    };
    TestsHandler.prototype.isLastComplete = function () {
        var lastTest = this.lastTest();
        if (lastTest === undefined) {
            return true;
        }
        else {
            return lastTest.isComplete();
        }
    };
    TestsHandler.prototype.lastTest = function () {
        if (this.tests.length === 0) {
            return undefined;
        }
        else {
            return this.tests[this.tests.length - 1];
        }
    };
    return TestsHandler;
}());
exports.TestsHandler = TestsHandler;
