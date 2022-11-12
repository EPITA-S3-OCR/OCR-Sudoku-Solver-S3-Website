---
layout: "@layouts/BlogLayout.astro"
---

# Solver

## Backtracking algorithms

There are a couple of well-known algorithms to find a solution of a sudoku grid, the main of which is **backtracking**. This algorithm can be both described as a **“brute force”** and **“depth-first” search**, because it works by exploring the “branch” of a possible solution before going to the next one, exhausting every single possibility if necessary.

![Backtracking algortihm](../assets/solver/backtracking.png)

To make a long story short, it works by first filling an empty cell of the sudoku grid with a possibly valid number. The program then continues by considering all of its previous statements to be correct and fills in as many cells as possible until it encounters an inconsistency defined by the rules of sudoku: no more than one same number per square, row or column. If such a case occurs, the algorithm goes backwards, hence its name, and **restarts generating valid numbers from the last stable point**. This process of trial and error continues until a valid (and unique) solution to the initially provided sudoku grid is found. It is also possible, however, that the sudoku being considered is **not** **solvable**: such a case is more likely and easily reached than one would imagine and may take the algorithm longer to figure out. But assuming that the sudoku is solvable, this method still has some flaws. Just like any other brute-forcing algorithm, checking all possibilities has a **certain computational cost**. In addition, there exists sudoku grids intrinsically designed to complicate the task of this kind of algorithm by **maximizing the number of trials** that the program will have to compute.

![Sudoku grid](../assets/solver/grid.png)

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
  <div class="flex justify-center">
    <img src="../assets/solver/Untitled%202.png" alt="File loading">
    <img src="../assets/solver/Untitled%203.png" alt="File loading">
  </div>
  <figcaption>File loading</figcaption>
</figure>

In order to respect the indications given in the project specifications handed in at the beginning of the year, **we implemented an executable named 'solver'** and taking as input a text file containing the sudoku grid to solve according to a specific and given format. Each file to solve is **specifically 11 lines and columns long**, including two empty lines. The empty places on the grid were replaced by dots and a space was placed to differentiate each sub-square for clarity. After the execution of the brute-force algorithm, the result was automatically written in a new text file and stored in a different folder.
