"use strict";
/*
    Test represents a class that contains one input example.
    For example it might represent the following in the standard input:
        3 4
        0001
        0011
        0110
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var Test = /** @class */ (function () {
    function Test(n, m) {
        this.n = n;
        this.m = m;
        this.data = [];
        this.solution = []; //this solution can also be used for visited points in BFS
    }
    Test.prototype.isComplete = function () {
        return this.data.length === this.n;
    };
    Test.prototype.addColumn = function (col) {
        this.data.push(col);
    };
    return Test;
}());
exports.Test = Test;
