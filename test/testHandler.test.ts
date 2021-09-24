import { TestsHandler } from "../src/bitmap/testHandlerClass";

test('addTest() adds one Test correctly', () => {
    const testHandler = new TestsHandler(1);
    testHandler.addTest(2, 4);
    expect(testHandler.tests.length).toBe(1);
});

test('addTest() adds two Tests correctly', () => {
    const testHandler = new TestsHandler(2);
    testHandler.addTest(2, 4);
    testHandler.addTest(4, 1);
    expect(testHandler.tests.length).toBe(2);
});

test('testsComplete() returns true when Tests have all their columns', () => {
    const testHandler = new TestsHandler(1);
    testHandler.addTest(1, 4);
    testHandler.tests[0].addColumn([0,0,0,1]);
    expect(testHandler.testsComplete()).toBe(true);
});

test('testsComplete() returns false when a Test is missing columns', () => {
    const testHandler = new TestsHandler(1);
    testHandler.addTest(2, 4);
    testHandler.tests[0].addColumn([0,0,0,1]);
    expect(testHandler.testsComplete()).toBe(false);
});

test('isLastComplete() returns true when there are not Tests', () => {
    const testHandler = new TestsHandler();
    expect(testHandler.isLastComplete()).toBe(true);
});

test('isLastComplete() returns true when the last Test is complete', () => {
    const testHandler = new TestsHandler(1);
    testHandler.addTest(1, 4);
    testHandler.tests[0].addColumn([0,0,0,1]);
    expect(testHandler.isLastComplete()).toBe(true);
});

test('isLastComplete() returns false when the last Test is not complete', () => {
    const testHandler = new TestsHandler(1);
    testHandler.addTest(2, 4);
    testHandler.tests[0].addColumn([0,0,0,1]);
    expect(testHandler.isLastComplete()).toBe(false);
});

test('lastTest() returns undefined if there are no Tests', () => {
    const testHandler = new TestsHandler();
    expect(testHandler.lastTest()).toBe(undefined);
});

test('lastTest() returns the last Test available', () => {
    const testHandler = new TestsHandler(2);
    testHandler.addTest(1, 4);
    testHandler.addTest(1, 4);
    expect(testHandler.lastTest()).toBe(testHandler.tests[1]);
});