import { Test } from "./testClass"
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

export class TestsHandler {
    public testsNumber : number | undefined
    readonly tests : Test[]

    public constructor(testsNumber? : number){
        this.testsNumber = testsNumber;
        this.tests = [];
    }

    public testsComplete() : boolean{
        return this.tests.length === this.testsNumber && this.tests.every(test => test.isComplete());;
    }

    public addTest(n: number, m: number): void {
        this.tests.push(new Test(n, m));
    }

    public isLastComplete(): boolean {
        const lastTest = this.lastTest();
        if (lastTest === undefined) {
         	return true;
        } else {
			return lastTest.isComplete();
        }
        
    }

    public lastTest(): Test | undefined {
        if (this.tests.length === 0) {
            return undefined;
        } else {
            return this.tests[this.tests.length - 1];
        }
    }
}