import { TestParser } from "../src/bitmap/testParser";

test('isTestsNumberValid() returns false when testNumber is string', () => {
    const testParser = new TestParser("Test");//passing string to readable stream make the process close otherwise stdin make the process open
    let firstLine = "qwerty"
    expect(testParser.isTestsNumberValid(parseInt(firstLine,10))).toBe(false);
});

test('isTestsNumberValid() returns false when testNumber is out of Range', () => {
    const testParser = new TestParser("Test");
    let firstLine = "0"
    expect(testParser.isTestsNumberValid(parseInt(firstLine,10))).toBe(false);
});

test('isTestsNumberValid() returns true when testNumber is in Range', () => {
    const testParser = new TestParser("Test");
    let firstLine = "3"
    expect(testParser.isTestsNumberValid(parseInt(firstLine,10))).toBe(true);
});

test('isRowColValid() returns false when n,m length is not equal to 2', () => {
    const testParser = new TestParser("Test");
    let secondLine = ["3", "4", "5"]
    expect(testParser.isRowColValid(secondLine)).toBe(false);
});

test('isRowColValid() returns false when n is not integer', () => {
    const testParser = new TestParser("Test");
    let secondLine = ["3", "we"]
    expect(testParser.isRowColValid(secondLine)).toBe(false);
});

test('isRowColValid() returns false when n is out of range', () => {
    const testParser = new TestParser("Test");
    let secondLine = ["323", "23"]
    expect(testParser.isRowColValid(secondLine)).toBe(false);
});

test('isRowColValid() returns false when m is out of range', () => {
    const testParser = new TestParser("Test");
    let secondLine = ["23", "323"]
    expect(testParser.isRowColValid(secondLine)).toBe(false);
});

test('isRowColValid() returns true when n,m is valid and in range', () => {
    const testParser = new TestParser("Test");
    let secondLine = ["3", "4"]
    expect(testParser.isRowColValid(secondLine)).toBe(true);
});

test('isValidTestCaseRow() returns false when row has more columns', () => {
    const testParser = new TestParser("Test");
    testParser.testsHandler.testsNumber = 1
    testParser.testsHandler.addTest(2,2);
    const lastTestParsed = testParser.testsHandler.lastTest();

    let secondLine = "010"
    expect(testParser.isValidTestCaseRow(secondLine, lastTestParsed)).toBe(false);
});

test('isValidTestCaseRow() returns false when every element in row is not integer', () => {
    const testParser = new TestParser("Test");
    testParser.testsHandler.testsNumber = 1
    testParser.testsHandler.addTest(2,2);
    const lastTestParsed = testParser.testsHandler.lastTest();

    let secondLine = "0a"
    expect(testParser.isValidTestCaseRow(secondLine, lastTestParsed)).toBe(false);
});

test('isValidTestCaseRow() returns false when add row in testcase which is not defined yet', () => {
    const testParser = new TestParser("Test");
    testParser.testsHandler.testsNumber = 1
    const lastTestParsed = testParser.testsHandler.lastTest();

    let secondLine = "01"
    expect(testParser.isValidTestCaseRow(secondLine, lastTestParsed)).toBe(false);
});
