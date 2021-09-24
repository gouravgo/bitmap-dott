"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestParser = void 0;
var testHandlerClass_1 = require("./testHandlerClass");
var readline = require("readline");
var stream_1 = require("stream");
var MAX_TEST_CASE_RANGE = 1000;
var MIN_TEST_CASE_RANGE = 1;
var MAX_ROW_VALUE = 182;
var MIN_ROW_VALUE = 1;
var TestParser = /** @class */ (function () {
    function TestParser(text) {
        this.testsHandler = new testHandlerClass_1.TestsHandler();
        var readable;
        if (text) {
            readable = stream_1.Readable.from([text]);
        }
        this.readInterface = readline.createInterface({
            input: readable ? readable : process.stdin,
            output: process.stdout,
            terminal: true,
        });
        this.finishedParsing = false;
    }
    TestParser.prototype.solve = function () {
        this.parse();
    };
    TestParser.prototype.parse = function () {
        var _this = this;
        this.readInterface.on('line', function (line) {
            if (!_this.finishedParsing) {
                if (_this.testsHandler.testsNumber == undefined) { //this if executed only first time to get the testNumber input
                    _this.testsHandler.testsNumber = parseInt(line, 10);
                    if (!_this.isTestsNumberValid(_this.testsHandler.testsNumber)) {
                        _this.readInterface.close();
                    }
                }
                else {
                    var newLine = line.split(' '); //always splitting the new line with space to know the nature of line
                    if (newLine.length === 1 && newLine[0] === '') { //detects new empty line, so just check if the last test is successfully parsed and do nothing
                        var lastTestParsed = _this.testsHandler.lastTest();
                        if (lastTestParsed == undefined || !lastTestParsed.isComplete()) {
                            console.log('Invalid test case input. Last test case was not completed\n');
                            _this.readInterface.close();
                        }
                    }
                    else {
                        if (_this.testsHandler.isLastComplete()) { //detects m,n value
                            if (!_this.isRowColValid(newLine)) { //should be two space seprated integer and in the range of 1 to 182
                                _this.readInterface.close();
                                return;
                            }
                            var n = parseInt(newLine[0], 10);
                            var m = parseInt(newLine[1], 10);
                            _this.testsHandler.addTest(n, m);
                        }
                        else { //detects a input row
                            var lastTestParsed = _this.testsHandler.lastTest();
                            if (!_this.isValidTestCaseRow(line, lastTestParsed)) {
                                _this.readInterface.close();
                                return;
                            }
                            newLine = line.split('');
                            if (lastTestParsed !== undefined && !lastTestParsed.isComplete()) { //if last test case is pending then add the colmns
                                lastTestParsed.addColumn(newLine.map(function (element) { return parseInt(element, 10); }));
                            }
                            if (_this.testsHandler.testsComplete()) { //if all test cases parsed successfully then solve the problem
                                _this.finishedParsing = true;
                                _this.calculateDistances().then(function () { return _this.readInterface.close(); });
                            }
                        }
                    }
                }
            }
        });
    };
    TestParser.prototype.calculateDistances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, tests;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        this.testsHandler.tests.forEach(function (test) { return promises.push(_this.BFS(test)); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        tests = _a.sent();
                        tests.forEach(function (test) { return _this.printSolution(test); });
                        return [2 /*return*/];
                }
            });
        });
    };
    TestParser.prototype.printSolution = function (test) {
        var _this = this;
        this.readInterface.write('\n');
        test.solution.forEach(function (element) {
            _this.readInterface.write(element.join(' '));
            _this.readInterface.write('\n');
        });
    };
    TestParser.prototype.BFS = function (test) {
        var _this = this;
        return new Promise(function (resolve) {
            test.solution = test.data.map(function (inner) { return inner.slice(); }); //solution varaible can also be used as a visitor in BFS
            var queue = [];
            var directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; //four valid directions to move
            //push the indexes in queue which has value 1.
            for (var i = 0; i < test.data.length; i++) {
                for (var j = 0; j < test.data[i].length; j++) {
                    if (test.data[i][j]) {
                        queue.push([i, j]);
                    }
                }
            }
            //start from the white pixels and move towards the black by Breadth First Search algo, and add distance by 1 from the prev index
            var firstIteration = 1; //this flag is true for the first iteration because our first BFS iterarion is not inremented with the prev value and it should be 1
            while (queue.length) {
                var size = queue.length;
                for (var i = 0; i < size; i++) {
                    var currPointer = queue.shift();
                    var currI = currPointer[0];
                    var currJ = currPointer[1];
                    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                        var dir = directions_1[_i];
                        var nextI = dir[0] + currI;
                        var nextJ = dir[1] + currJ;
                        if (_this.isSafeToMove(nextI, nextJ, test.n, test.m) && !test.solution[nextI][nextJ]) { //if nextI, nextJ is in matrix and not yet visited then add that index in queue
                            test.solution[nextI][nextJ] = firstIteration ? 1 : test.solution[currI][currJ] + 1;
                            queue.push([nextI, nextJ]);
                        }
                    }
                }
                firstIteration = 0;
            }
            //Now change initial white pixels to black
            for (var i = 0; i < test.data.length; i++) {
                for (var j = 0; j < test.data[i].length; j++) {
                    if (test.data[i][j]) {
                        test.solution[i][j] = 0;
                    }
                }
            }
            resolve(test);
        });
    };
    //For BFS, handling corner cases(don't move outside from the matrix)
    TestParser.prototype.isSafeToMove = function (i, j, r, c) {
        return i >= 0 && j >= 0 && i < r && j < c;
    };
    //validators
    //testNumber should be valid intger and in range of given constraint
    TestParser.prototype.isTestsNumberValid = function (testNumber) {
        if (isNaN(testNumber)) {
            console.log('Invalid test case input\n');
            return false;
        }
        else if (testNumber > MAX_TEST_CASE_RANGE || testNumber < MIN_TEST_CASE_RANGE) {
            console.log('Test cases should be in the range of 1 to 1000\n');
            return false;
        }
        return true;
    };
    //row,col should be valid intger and in range of given constraint
    TestParser.prototype.isRowColValid = function (line) {
        if (line.length != 2) {
            console.log('Invalid test case input. n,m(Integers) should be seprated by single space\n');
            return false;
        }
        var row = parseInt(line[0], 10);
        var col = parseInt(line[1], 10);
        if (isNaN(row) || isNaN(col)) {
            console.log('Invalid test case input. n,m should be pair of integer numbers\n');
            return false;
        }
        else if (row > MAX_ROW_VALUE || row < MIN_ROW_VALUE) {
            console.log('Row(n) should be in the range of 1 to 182\n');
            return false;
        }
        else if (col > MAX_ROW_VALUE || col < MIN_ROW_VALUE) {
            console.log('Col(m) should be in the range of 1 to 182\n');
            return false;
        }
        return true;
    };
    //every elements of row should be valid intger and lenght should be less than m(col)
    TestParser.prototype.isValidTestCaseRow = function (line, lastTestParsed) {
        if (lastTestParsed == undefined) {
            console.log('Invalid test case input.\n');
            return false;
        }
        var newLine = line.split('');
        var newLineMap = newLine.map(function (element) { return parseInt(element, 10); });
        if (newLineMap.length !== lastTestParsed.m) {
            console.log('Invalid test case input. Column length mismatched\n');
            return false;
        }
        //console.log(newLineMap);
        if (!newLineMap.every(function (col) { return !isNaN(col); })) {
            console.log('Invalid test case input. Column value should be integer\n');
            return false;
        }
        return true;
    };
    return TestParser;
}());
exports.TestParser = TestParser;
