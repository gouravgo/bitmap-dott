## Description

Solution For the bitmap assignment

# Task 
There is given a rectangular bitmap of size n*m. Each pixel of the bitmap is either white or black, but at least one is white. The pixel in i-th line and j-th column is called the pixel (i,j). The distance between two pixels p1=(i1,j1) and p2=(i2,j2) is defined as d(p1,p2)=|i1-i2|+|j1-j2|. Write a program which: <br />
    ● reads the description of the bitmap from the standard input;<br /> 
    ● for each pixel, computes the distance to the nearest white; <br />
    ● writes the results to the standard output.<br />
Input <br />
The number of test cases t (1≤t≤1000) is in the first line of input, then t test cases follow separated by an empty line. In the first line of each test case there is a pair of integer numbers n, m separated by a single space, 1<=n <=182, 1<=m<=182. In each of the following n lines of the test case exactly one zero-one word of length m, the description of one line of the bitmap, is written. On the j-th position in the line (i+1), 1 <= i <= n, 1 <= j <= m, is '1' if, and only if the pixel (i,j) is white. 
<br /><br />
Output <br />
In the i-th line for each test case, 1<=i<=n, there should be written m integers f(i,1),...,f(i,m) separated by single spaces, where f(i,j) is the distance from the pixel (i,j) to the nearest white pixel. <br />
Example: <br />
Input:<br /> 
1 <br />
3 4 <br />
0001 <br />
0011 <br />
0110 <br />

Output <br />
3 2 1 0 <br />
2 1 0 0 <br />


## Instructions

1 - Install packages by running:

```bash
    npm install
```

2 - Execute tests, build and execute:

```bash
    npm run solve
```

or if you want to skip the tests and build:

```bash
    npm run start
```

This will leave the Standand Input listening to the user's input. Copy and Paste your examples and press Enter. You can find an example [here](./input-example.txt).

Once you press enter, the results will be printed in your terminal and the process will finish.