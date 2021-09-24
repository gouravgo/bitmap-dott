/*
    Test represents a class that contains one input example.
    For example it might represent the following in the standard input:
        3 4
        0001
        0011
        0110
*/


export class Test {
    readonly n : number
    readonly m : number
    readonly data : number[][]
    public solution : number[][]

    public constructor(n: number, m: number){
        this.n = n;
        this.m = m;
        this.data = [];
        this.solution = [] //this solution can also be used for visited points in BFS
    }

    public isComplete(): boolean {
        return this.data.length === this.n;
    }

    public addColumn(col : number[]):void | never{
        this.data.push(col);
    }
}