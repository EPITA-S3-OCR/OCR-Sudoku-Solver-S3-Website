---
layout: "@layouts/BlogLayout.astro"
title: "Solver"
---

## Backtracking algorithms

There are a couple of well-known algorithms to find a solution of a sudoku grid, the main of which is **backtracking**. This algorithm can be both described as a **“brute force”** and **“depth-first” search**, because it works by exploring the “branch” of a possible solution before going to the next one, exhausting every single possibility if necessary.

![Backtracking algortihm](/assets/solver/backtracking.png)

To make a long story short, it works by first filling an empty cell of the sudoku grid with a possibly valid number. The program then continues by considering all of its previous statements to be correct and fills in as many cells as possible until it encounters an inconsistency defined by the rules of sudoku: no more than one same number per square, row or column. If such a case occurs, the algorithm goes backwards, hence its name, and **restarts generating valid numbers from the last stable point**. This process of trial and error continues until a valid (and unique) solution to the initially provided sudoku grid is found. It is also possible, however, that the sudoku being considered is **not** **solvable**: such a case is more likely and easily reached than one would imagine and may take the algorithm longer to figure out. But assuming that the sudoku is solvable, this method still has some flaws. Just like any other brute-forcing algorithm, checking all possibilities has a **certain computational cost**. In addition, there exists sudoku grids intrinsically designed to complicate the task of this kind of algorithm by **maximizing the number of trials** that the program will have to compute.

![Sudoku grid](/assets/solver/grid.png)

This is the type of algorithm that was chosen to be implemented for the first defense of the project, but extensive research by the team members revealed a potentially better alternative: **Algorithm X**.

## Algorithm X

This algorithm is originally used for solving a specific mathematical problem called **“exact cover problem”**. it consists of having a set named $X$, and a collection of subsets of $X$, $S$. The point of it all is to find a sub-collection $S*$ of $S$ such that each element in $X$ is contained in exactly one subset in $S*$.

**Example**

Let $S = \{N,O,P,E\}$ be a collection of subsets of a set $X = \{1, 2, 3, 4\}$ such that:

- $N = \{ \}$,
- $O = \{1, 3\}$,
- $P = \{1, 2, 3\}$, and
- $E = \{2, 4\}$.

Then “$O$ union $E$” is said to be an exact cover of $X$, while $P$ union $E$ would not, because the element “3” appears in both $P$ and $E$.

This formulation is equivalent to having an $N*M$ binary matrix in which the goal **is to select a subset of the rows such that the digit 1 appears in each column exactly once**, for instance, the example just stated above could be represented as follows:

|     | 1   | 2   | 3   | 4   |
| --- | --- | --- | --- | --- |
| N   | 0   | 0   | 0   | 0   |
| O   | 1   | 0   | 1   | 0   |
| P   | 1   | 1   | 1   | 0   |
| E   | 0   | 1   | 0   | 1   |

|     | 1   | 2   | 3   | 4   |
| --- | --- | --- | --- | --- |
| O   | 1   | 0   | 1   | 0   |
| E   | 0   | 1   | 0   | 1   |

Sudoku grids and its solving process can then be seen as an **exact cover problem** by transforming its four essential constraints:

- For each row, a number can appear only once.
- For each column, a number can appear only once.
- For each region (small square), a number can appear only once.
- Each cell can only have one number.

We could therefore come up with a **$9^3$ by $4 \cdot 9^2$ binary matrix** such that each of its column represents a specific constraint for a sudoku grid cell and each row contains the possible value the cell may take from 1 to 9. Every row will thus have a 1 for each constraint it satisfies and a 0 otherwise.

With this in mind, the pseudo-code of such an algorithm would look something like this:

```
If the matrix A has no columns, the current partial solution is a valid solution;
  terminate successfully
Choose a row r such that Ar, c = 1 (nondeterministically)
Include row r in the partial solution
for each column j such that Ar, j = 1,
  for each row i such that Ai, j = 1,
    delete row i from matrix A
  delete column j from matrix A
Repeat this algorithm recursively on the reduced matrix A
```

The final solved sudoku grid is then a reduced matrix with a set of rows that solves this exact cover problem. In other words, we have a set of rows that map to a solution in our sudoku puzzle by ensuring all constraints are satisfied. However, this implementation requires certain data management structures such **as double-linked lists in order to optimize the space occupied by the static binary matrix used**. It is partly for this reason that this algorithm **was not yet implemented in the first defense** of the project.

## File loading \& writing

After having a way to solve the sudoku itself, another important part **is how this puzzle will be loaded**. For that, the chosen architecture was to have an examples and results directory.

<figure> 
  <div class="grid grid-cols-3 gap-4 place-items-center justify-center">
    <img src="/assets/solver/16unsolved.png" alt="File loading">
    <img src="/assets/solver/architecture.png" alt="File loading">
    <img src="/assets/solver/3x3solved.png" alt="File loading">
  </div>
  <figcaption>File loading</figcaption>
</figure>

In order to respect the indications given in the project specifications handed in at the beginning of the year, **we implemented an executable named 'solver'** and taking as input a text file containing the sudoku grid to solve according to a specific and given format. Each file to solve is **specifically 11 lines and columns long**, including two empty lines. The empty places on the grid were replaced by dots and a space was placed to differentiate each sub-square for clarity. After the execution of the brute-force algorithm, the result was automatically written in a new text file and stored in a different folder.

For the final defense, we also had planned and thus managed to implement a 16x16 sudoku grid solver. The same way as for the solver we presented during first defense, we **generalized and scaled the code** for it by modifying every for loops that previously were only working for going over 9 iterations. We also had to rework the way the checks for a move to be valid or not since the numbers going into the grid were **now from 1 to 16 represented in hexadecimal as 1 to G**. Ultimately, the loading of a sudoku grid did not change much in the sense that the user **would still load one by choosing a specific text file containing the sudoku in the same format as for the 9x9 grids**.

![Hexadokus](/assets/solver/16x16.png)

## Algorithm X implementation

### Introduction \& concept

In this section of our project, we will be exploring our implementation of **a different approach to classical backtracking algorithms for solving sudokus** : Algorithm X. This method offers a **more efficient and effective way** of solving these types of algorithms, and we will be implementing it in our code to compare its performance with traditional backtracking methods. Before delving into the implementation details, let us first provide a brief overview of the basics of backtracking algorithms and the **motivation behind using Algorithm X**.

Algorithm X is a well-known backtracking algorithm for **solving the exact cover problem**, which is the problem of finding a subset of a given set of elements such that each element in the universe appears in exactly one of the subsets. This algorithm was developed by Donald Knuth and is discussed in his book "The Art of Computer Programming, Volume 4A: Combinatorial Algorithms, Part 1." In the context of Sudoku, the exact cover problem can be defined as **finding a subset of the possible numbers (1-9) for each cell in the grid such that each number appears in exactly one cell in each row, column, and 3x3 sub-grid (resp. 1-G for a 4x4 matrix)**. The solution to the Sudoku puzzle is then given by the subset of numbers that forms the exact cover. In the following few pages, we will present the evolution of the chronological development of the latter.

For our first draft, we used a **recursive function** similar to the one described above. However, we quickly realized that our implementation was inefficient and had a **time complexity of** $O(9^{n})$, where $n$ is the number of empty cells in the Sudoku grid. Then, as a first main improvement, we implemented **the dancing links version of Algorithm X**, also known as the circular linked lists algorithm. This allowed us to significantly reduce the time complexity of our implementation to $O(n^{2} * m)$, where $n$ is the number of rows and $m$ is the number of columns in the Sudoku grid. This allowed us to solve larger and more difficult Sudoku puzzles **in a reasonable amount of time**. Finally, for our second and final improvement, we implemented **the MRV optimization, which stands for "Minimum Remaining Values"**. This optimization uses the concept of heuristics to prioritize the cells with the fewest remaining possible values, thus reducing the number of recursive calls and improving the overall performance of the algorithm. With this optimization, we were able to further reduce **the time complexity of our implementation to $O(n * m * d)$**, where $d$ is the maximum number of choices for any cell in the Sudoku grid. This allowed us to solve even the most challenging Sudoku puzzles **in a fraction of the time compared to our first draft**.

But before jumping into the explanation of our implementations, we need clarify **why the recursive version of Algorithm X is different from a regular backtracking algorithm**. First, Algorithm X uses a more systematic approach to searching for a solution, whereas regular backtracking algorithms typically use a more brute-force approach. This means that Algorithm X is able to find a solution **faster and with fewer recursive calls**.

Second, Algorithm X uses the concept of **exact cover to determine which moves to make at each step**. This allows it to **prune the search tree** and avoid making unnecessary recursive calls, which can further improve its performance. In contrast, regular backtracking algorithms do not use this concept and may make many more recursive calls before finding a solution.

### Method 1: Recursive version

In our main function only taking a 2D-grid representation of the Sudoku grid, we first initialized an array called "subsets" that would **store the rows, columns, and 3x3 sub-grids in the Sudoku puzzle**. We then filled this array with the values from the grid, so that each element in the array represented a cell in the corresponding row, column, or sub-grid. Next, we created an array called "choices" that would store the **possible numbers for each cell in the grid**. This array was initialized with the possible numbers for each empty cell, and with the number in the cell for non-empty cells. Finally, we called the recursive function "solveRecAlgoX()" that would implement Knuth's algorithm to find a solution to the Sudoku puzzle. This function took two arguments: the "subsets" array and the "choices" array. The function returned 1 if a solution was found, and 0 otherwise. It used recursion to find the exact cover of the Sudoku grid:

```c
{
  // Initialization of the subsets array
  ... snip ...

  // Create an array to store the choices for each cell in the grid
  int choices[9][9][9];

  // Initialize the array with the possible numbers for each cell
  for (int i = 0; i < 9; i++)
  {
    for (int j = 0; j < 9; j++)
    {
      if (grid[i][j] == 0)
      {
        // If the cell is empty, add all possible numbers to the choices array
        for (int k = 0; k < 9; k++)
        {
          choices[i][j][k] = k + 1;
        }
      }
      else
      {
        // If the cell is not empty, add only the number in the cell to the choices array
        choices[i][j][0] = grid[i][j];
      }
    }
  }

  // Call the recursive function to find a solution using Algorithm X
  return solveRecAlgoX(subsets, choices);
}
```

First, it found the cell **with the fewest number of choices using the "findEmptyCell()" function** which took the Sudoku grid as an argument and searched for the first empty cell in the grid (i.e., a cell with a value of 0 in the subsets array) and **stored its row and column indices in the provided variables**. This function returned 1 if an empty cell was found, and 0 otherwise,

Once we had found the cell with the fewest number of choices, we tried all possible numbers in that cell and recursively called the function to continue searching for a solution. If at any point it was not possible to make a valid move, we backtracked to the previous move and tried a different number in that cell. This process continued until either a solution was found or all possible combinations had been exhausted without finding a solution.

### Method 2: Dancing links implementation

In the context of Sudoku, dancing links can be used to improve the implementation of Algorithm X by **reducing the number of recursive calls** and the overall computational complexity of the algorithm.

Dancing links are a technique for efficiently **representing and manipulating sets of subsets, such as the rows, columns, and 3x3 sub-grids in a Sudoku puzzle**. The basic idea is to represent each subset as a linked list of nodes, where each node corresponds to an element in the universe. The nodes are linked together in a circular fashion, so that each node has a "left" and "right" neighbor, as well as an "up" and "down" neighbor. This representation is called a "**doubly-linked circular list**."

```c
struct Node {
    int value; // corresponds to an element in the universe
    struct Node *left;
    struct Node *right;
    struct Node *up;
    struct Node *down;
};

struct List {
    struct Node *first;
    struct Node *last;
};
```

![Circular doubly linked-list representation](/assets/solver/doublylinked.png)

Using dancing links, we can represent the subsets in a Sudoku puzzle as doubly-linked circular lists, where **each node in the list represents a cell in the corresponding row, column, or sub-grid**. The left and right neighbors of a node correspond to the previous and next cells in the row, column, or sub-grid, respectively, while the up and down neighbors correspond to the cells in the same column or row, respectively.

We therefore modified the function : we first **initialize an array of 27 doubly-linked circular lists**, where each list represents a row, column, or sub-grid in the Sudoku puzzle. We then call the recursive function "solveRecAlgoXDancingLinks()" that will implement Knuth's algorithm using dancing links. This function takes a single argument: the array of subset lists.

The code for this function looked like this :

```c
int solveRecAlgoXDancingLinks(int subsets[27][9], int choices[9][9][9])
{
  // Check if there are any empty cells in the grid
  ... snip ...

  // Choose the cell with the fewest number of choices
  ... snip ...

  // Try all possible numbers in the chosen cell
  for (int k = 0; k < 9; k++)
  {
    int num = choices[row][col][k];
    if (num != 0)
    {
      // Check if the move is valid
      if (is_valid_move(subsets, row, col, num))
      {
        // If the move is valid, make the move and recursively call the function
        subsets[row][col] = num;
        choices[row][col][k] = 0;
        if (solveRecAlgoXDancingLinks(subsets, choices)) return 1;

        // If the recursive call returns 0, backtrack and try a different number
        subsets[row][col] = 0;
        choices[row][col][k] = num;
      }
    }
  }
  // If none of the numbers work, there is no solution
  return 0;
}
```

First, it was finding the cell with the fewest number of choices using the "findEmptyCell()" function, which we have already explained (i.e., a cell with a NULL value in the subset lists).

Once we have found it, we iterate over the doubly-linked circular list of choices for that cell and **try each number in turn**. If a move is valid, we "cover" the row and column of the chosen cell, which **effectively removes them from the subset lists**. We then recursively call the function to continue searching for a solution. If at any point it is not possible to make a valid move, we backtrack to the previous move and try a different number in that cell. This process will continue until either a solution is found or all possible combinations have been exhausted without finding a solution.

### Method 3 : Minimal Remaining Values (MRV)

As we said earlier, in the context of Algorithm X applied to solving Sudoku puzzles, MRV stands for "Minimum Remaining Values". This optimization is **a heuristic that can be used to improve the performance of the algorithm**. The basic idea behind MRV is to prioritize the cells with the fewest remaining possible values when making recursive calls. This is based **on the observation that cells with a small number of remaining values are more likely to lead to a solution**, and therefore should be explored first. By prioritizing these cells, we can reduce the number of recursive calls and improve the overall performance of the algorithm. To implement the MRV heuristic in the Algorithm X implementation, we did not modify the main function **but rather the recursive function** we had designed for the Dancing Links implementation, now renaming it "solveRecAlgoX_MRV()" function.

```c
int solveRecAlgoX_MRV(int subsets[27][9], int choices[9][9][9])
{
  // Check if there are any empty cells in the grid & choose the cell with the fewest number of choices
  ... snip ...

  // Try all possible numbers in the chosen cell
  Node *node = subset_lists[row + 18][col];
  while (node != NULL)
  {
    // Check if the move is valid
    if (is_valid_move(subset_lists, row, col, node->value))
    {
      // If the move is valid, make the move and recursively call the function
      cover_row(subset_lists, row);
      cover_column(subset_lists, col);
      if (solveRecAlgoX_using_dancing_links(subset_lists)) return 1;
      // If the recursive call returns 0, backtrack and try a different number
      uncover_row(subset_lists, row);
      uncover_column(subset_lists, col);
    }
    // Move to the next choice in the list
    node = node->right;
  }
  // If none of the numbers work, there is no solution
  return 0;
}
```

This time, we are not interested **in finding the next empty cell but rather finding the cell with the fewest number of remaining choices using the MRV heuristic**. This is done by iterating over all the empty cells in the grid and counting the number of remaining choices for each cell. The cell with the **fewest number of remaining choices** is then selected as the next cell to be considered in the search for a solution.

Once the next cell has been selected using the MRV heuristic, the algorithm proceeds as before, **trying each possible number in turn and recursively calling the function to continue the search for a solution**. If at any point it is not possible to make a valid move, the algorithm backtracks to the previous move and tries a different number in that cell.

### Algorithm X Complexities

When using all the optimizations, such as dancing links and the MRV heuristic, the time and space complexity of the Algorithm X implementation for solving Sudoku puzzles **can be reduced to $O(n^{2} * 2^{n})$, where $n$ is the number of empty cells in the puzzle**. This is because the MRV heuristic allows us to more quickly and efficiently choose the next cell to be considered in the search, reducing the number of recursive calls and the overall computational complexity of the algorithm. Additionally, the use of dancing links allows **us to more efficiently represent and manipulate the subsets in the puzzle**, further reducing the **time and space complexity of the algorithm**.

It also highly depend on the difficulty of the sudoku grid : in fact a puzzle **can be difficult to find a solution to even if it is filled with a relatively large number of non-empty tiles**. But in fact knowing how to measure of such a puzzle beforehand could be used to determine the expected performance of the algorithm on a given puzzle, and to compare the performance of different implementations of the algorithm. To measure the difficulty of a Sudoku puzzle, **we could use a metric such as the number of empty cells in the puzzle**, or the average number of remaining choices for each empty cell. These metrics could be used to classify grids into different levels of difficulty, and **to predict the expected performance of the algorithm on a given puzzle**.

In addition, it would be helpful to have data on the performance of Algorithm X on a large number of Sudoku puzzles,**to allow for a more detailed analysis of the algorithm's performance and to compare the performance of different implementations**. This data could be collected by running the algorithm on a large number of puzzles and measuring the time and space complexity of the algorithm on each puzzle. This would provide a more complete picture of the performance of the algorithm and allow **for more accurate comparisons** between different implementations.
