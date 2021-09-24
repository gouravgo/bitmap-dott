import { Test } from "./testClass";
export declare class TestsHandler {
    testsNumber: number | undefined;
    readonly tests: Test[];
    constructor(testsNumber?: number);
    testsComplete(): boolean;
    addTest(n: number, m: number): void;
    isLastComplete(): boolean;
    lastTest(): Test | undefined;
}
