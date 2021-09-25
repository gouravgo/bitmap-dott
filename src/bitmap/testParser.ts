import { TestsHandler } from "./testHandlerClass";
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path'
import { Test } from "./testClass";
import { promises } from "dns";
import { Readable } from "stream";

const MAX_TEST_CASE_RANGE = 1000;
const MIN_TEST_CASE_RANGE = 1;

const MAX_ROW_VALUE = 182;
const MIN_ROW_VALUE = 1



export class TestParser {
    public testsHandler : TestsHandler
    private readInterface : readline.Interface
    private finishedParsing : boolean

    public constructor(text?: string | undefined) { //here text variable is used for unit test cases to close the readstream
        this.testsHandler = new TestsHandler();
        let readable;
        if(text){
            readable = Readable.from([text]);
        }
        this.readInterface = readline.createInterface({
            input: readable ? readable : process.stdin, //fs.createReadStream(path.join(__dirname, '../../testInput.txt'))
            output: process.stdout,
            terminal: true,
        });
        this.finishedParsing = false;
    }

    public solve(): void {
		this.parse();
    }

    private parse() :void{
        this.readInterface.on('line', (line) => {
            if(!this.finishedParsing){
                if(this.testsHandler.testsNumber == undefined){ //this if executed only first time to get the testNumber input
                    this.testsHandler.testsNumber = parseInt(line, 10);
                    if(!this.isTestsNumberValid(this.testsHandler.testsNumber)){
                        this.readInterface.close()
                    }
                }else{
                    let newLine: string[] = line.split(' ');//always splitting the new line with space to know the nature of line

                    if(newLine.length === 1 && newLine[0] === ''){//detects new empty line, so just check if the last test is successfully parsed and do nothing
                        const lastTestParsed = this.testsHandler.lastTest();
                        if(lastTestParsed == undefined || !lastTestParsed.isComplete()){
                            console.log('Invalid test case input. Last test case was not completed\n');
                            this.readInterface.close()
                        }
                    }else{
                        if(this.testsHandler.isLastComplete()){//detects m,n value
                            if(!this.isRowColValid(newLine)){//should be two space seprated integer and in the range of 1 to 182
                                this.readInterface.close()
                                return;
                            }
                            let n : number = parseInt(newLine[0], 10);
                            let m : number = parseInt(newLine[1], 10)
                            this.testsHandler.addTest(n, m);
                        }else{                                  //detects a input row
                            const lastTestParsed = this.testsHandler.lastTest();
                            if(!this.isValidTestCaseRow(line, lastTestParsed)){
                                this.readInterface.close()
                                return;
                            }
                            newLine = line.split('');
                            if(lastTestParsed !== undefined && !lastTestParsed.isComplete()){ //if last test case is pending then add the colmns
                                lastTestParsed.addColumn(newLine.map(element => parseInt(element, 10)));
                            }

                            if(this.testsHandler.testsComplete()){//if all test cases parsed successfully then solve the problem
                                this.finishedParsing = true;
                                this.calculateDistances().then(() => this.readInterface.close());
                            }
                        }
                    }
                }
            }

        })
    }

    private async calculateDistances(){
        const promises: Promise<Test>[] = [];
        this.testsHandler.tests.forEach(test => promises.push(this.BFS(test)));
        const tests = await Promise.all(promises);//parallely calculate the all test cases using BFS
        tests.forEach(test => this.printSolution(test));
    }

    private printSolution(test: Test) {
        this.readInterface.write('\n');
        test.solution.forEach(element => {
            this.readInterface.write(element.join(' '));
            this.readInterface.write('\n');
        });
    }

    private BFS(test: Test) : Promise<Test> {
        return new Promise(resolve => {
            //solution varaible can also be used as a visitor in BFS
            test.solution = test.data.map(inner => inner.slice()); //created a shallow copy of data
            let queue = [];
            let directions = [[0,1], [1,0], [0,-1], [-1,0]]; //four valid directions to move. <, > ,^, v 

            //push the indexes in queue which has value 1.
            for(let i=0; i<test.data.length; i++){
                for(let j=0; j<test.data[i].length; j++){
                    if(test.data[i][j]){
                        queue.push([i, j]);  
                    }
                }
            }

            //start from the white pixels and move towards the black by Breadth First Search algo, and add distance by 1 from the prev index
            /** NOTE :- For first iteration, value should be 1 and after that add distance by 1 from the prev index
             * For Example
                0001        0011        0211        3211
                0011  -->   0111  -->   2111 -->    2111
                0110        1111        1111        1111
            */
            let firstIteration = 1;//this flag is true for the first iteration because first BFS iterarion is not inrcemented with the prev value and it should be 1
            while(queue.length){
                const size = queue.length;
                for(let i=0; i<size; i++){
                    let currPointer : any = queue.shift();
                    const currI = currPointer[0];
                    const currJ = currPointer[1];
                    for (let dir of directions) {
                        let nextI = dir[0] + currI;
                        let nextJ = dir[1] + currJ;
                        if(this.isSafeToMove(nextI, nextJ, test.n, test.m) && !test.solution[nextI][nextJ]){ //if nextI, nextJ is in matrix and not yet visited then add that index in queue
                            test.solution[nextI][nextJ] = firstIteration ? 1 : test.solution[currI][currJ] + 1;
                            queue.push([nextI, nextJ]);
                        }
                    }
                }
                firstIteration = 0;
            }
            //Now change initial white pixels to black
            /**
                3211        3210
                2111  -->   2100
                1111        1001
            */
            for(let i=0; i<test.data.length; i++){
                for(let j=0; j<test.data[i].length; j++){
                    if(test.data[i][j]){
                        test.solution[i][j] = 0;
                    }
                }
            }
            resolve(test)
        })
    }

    //For BFS, handling corner cases(don't move outside from the matrix)
    private isSafeToMove(i:number, j:number, r:number, c:number) : boolean{
        return i>=0 && j>=0 && i<r && j<c;
    }

    //validators

    //testNumber should be valid intger and in range of given constraint
    public isTestsNumberValid(testNumber : number): boolean {
        if(isNaN(testNumber)){
            console.log('Invalid test case input\n');
            return false;
        }else if(testNumber > MAX_TEST_CASE_RANGE || testNumber <MIN_TEST_CASE_RANGE){
            console.log('Test cases should be in the range of 1 to 1000\n');
            return false;
        }
        return true;
    }

    //row,col should be valid intger and in range of given constraint
    public isRowColValid(line : string[]): boolean {
        if(line.length!=2){
            console.log('Invalid test case input. n,m(Integers) should be seprated by single space\n');
            return false;
        }
        let row = parseInt(line[0], 10);
        let col = parseInt(line[1], 10)
        if(isNaN(row) || isNaN(col)){
            console.log('Invalid test case input. n,m should be pair of integer numbers\n');
            return false;
        }else if(row > MAX_ROW_VALUE || row <MIN_ROW_VALUE){
            console.log('Row(n) should be in the range of 1 to 182\n');
            return false;
        }else if(col > MAX_ROW_VALUE || col <MIN_ROW_VALUE){
            console.log('Col(m) should be in the range of 1 to 182\n');
            return false;
        }
        return true;
    }

    //every elements of row should be valid intger and lenght should be less than m(col)
    public isValidTestCaseRow(line : string, lastTestParsed : any): boolean {
        if(lastTestParsed == undefined){
            console.log('Invalid test case input.\n');
            return false;
        }
        let newLine : string[] = line.split('');
        let newLineMap = newLine.map(element => parseInt(element, 10))
        if(newLineMap.length !== lastTestParsed.m){
            console.log('Invalid test case input. Column length mismatched\n');
            return false;
        }
        //console.log(newLineMap);
        if(!newLineMap.every(col => !isNaN(col))){
            console.log('Invalid test case input. Column value should be integer\n');
            return false;
        }
        return true;
    }
}