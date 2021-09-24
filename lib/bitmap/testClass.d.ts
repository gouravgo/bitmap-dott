export declare class Test {
    readonly n: number;
    readonly m: number;
    readonly data: number[][];
    solution: number[][];
    constructor(n: number, m: number);
    isComplete(): boolean;
    addColumn(col: number[]): void | never;
}
