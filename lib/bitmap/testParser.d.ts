import { TestsHandler } from "./testHandlerClass";
export declare class TestParser {
    testsHandler: TestsHandler;
    private readInterface;
    private finishedParsing;
    constructor(text?: string | undefined);
    solve(): void;
    private parse;
    private calculateDistances;
    private printSolution;
    private BFS;
    private isSafeToMove;
    isTestsNumberValid(testNumber: number): boolean;
    isRowColValid(line: string[]): boolean;
    isValidTestCaseRow(line: string, lastTestParsed: any): boolean;
}
