import { Test } from "../src/bitmap/testClass";

test('isComplete() returns false when there are no columns', () => {
    const test = new Test(2, 4);
    expect(test.isComplete()).toBe(false);
});

test('isComplete() returns false when there columns is missing', () => {
    const test = new Test(2, 4);
    test.addColumn([1,2,3,4]);
    expect(test.isComplete()).toBe(false);
});


test('isComplete() returns true when columns are complete', () => {
    const test = new Test(2, 4);
    test.addColumn([0,0,0,1]);
    test.addColumn([0,1,1,1]);
    expect(test.isComplete()).toBe(true);
});

test('addColumn() adds one column correctly', () => {
    const test = new Test(2, 4);
    test.addColumn([0,0,1,1]);
    expect(test.data.length).toBe(1);
});