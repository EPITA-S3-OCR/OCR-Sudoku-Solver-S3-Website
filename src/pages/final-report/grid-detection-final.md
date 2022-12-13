---
layout: "@layouts/BlogLayout.astro"
order: 1
---

# Grid detection

## Hough transform

We use the Hough transform algorithm **which detects specific shapes like circles or lines in a given image** after applying a Sobel edge detection.

The Hough transform algorithm works by converting each point $(x,y)$ of the cartesian domain of a given image into a polar frame point of coordinates $(\theta, r)$. Each point c**orresponds to a line in the image and each point in polar coordinates correspond to a line in the cartesian space**.

To start the algorithm we create a new table properly dimensionned in order to store all values in the polar frame. We loop through each pixel in the binarized image, and if the pixel is white we trace the line corresponding to it using the formula in Figure~\ref{fig:image lines}. **As the number of crossing at the same intersection point increases, becomes more and more likely a line lines connect**.

![Hough transform space](/assets/image-processing/hough.png)

We then loop in the polar coordinates matrix to get the maximum value, which is in fact the largest amount of intersection of lines. It will therefore define the main line in cartesian coordinates **that would have to be traced on the initial image**.

Once we have the maximum value, we can trace and store all lines that are **at least of the value that is half of the maximum in the polar matrix**. Since this technique can produce a very large amount of lines, we reduced it by checking, when adding a new line, if there is one that is already approximately **placed at the same position in the list of all other lines**.

<figure>
  <div class="grid grid-cols-2 items-center gap-8">
    <img src="/assets/image-processing/accumulator.jpg" alt="File loading">
    <img src="/assets/image-processing/6-lines.jpg" alt="File loading">
  </div>
  <figcaption>Hough transform process</figcaption>
</figure>

## Image Rotation

The next step is to find the rotation angle. We therefore get the maximum angle from all the lines and compare it to the top border of the image (which is a straight horizontal line) but neglect the angle where their absolute value **is > 80°**. We can improve this detection by doing this step after the square detection, or by only using the angle **to find the one we needed**.

## Square detection

The square detection is defined on the following algorithm:

1. Loop through the lines list to find **an intersection**.
2. When one is found, we loop again to find **other intersection points** **from the same line** to form a square.
3. Inspect and make sure the distances are approximately the same while neglecting the squares that have a distance considered too small defined by a specific threshold.
4. If a square is detected, we use our SudokuCell structure while providing its dimensions values xTopLeft, yTopLeft, xBottomRight, yBottomRight, etc.

After detecting every square, we needed to find the top left and bottom right points of the sudoku. To do so, our program looped through every square to detect the one which had the closest values to 0 for xTopLeft and yTopLeft. We found out that this was working well but **highly dependent and relying on the overall image quality**. We thus set a threshold of proximity to the new point to solve this problem for now but it **will be improved in the future**. The same process was applied to determine the point bottom right point of the sudoku.

At this point, we have a starting point $(x,y)$ and two distances **ready for the image-splitting algorithm**.

![Squares detected on the example image](/assets/image-processing/9-draw_squares.jpg)



## Improvements

After the first defense of the project, we modified, or at least optimized, a **major part of our image processing**.

\vspace{\baselineskip}

First of all, we made several improvements to our image processing algorithm. One of the key changes we made was the method we used for **calculating the noise level** in an image. Previously, we were using the following simple algorithm that would count the numbers of pixels which value was above a specific threshold.

![Previous noise detection calculation](/assets/image-processing/c_code_one.PNG)

However, this method was **not very accurate** and often resulted in noisy images. To improve this, we decided to use **standard deviation** as a measure of the noise level in the image. Standard deviation is a statistical measure that indicates how much the values in a data set vary from the mean (average) value. We can calculate the standard deviation of a data set using the following formula: $\sigma = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \mu)^2}{n}}$ where $\sigma$ is the standard deviation, $x_i$ is the $i^{th}$ value in the data set, $\mu$ is the mean value, and $n$ is the total number of values in the data set.


![Noise calculation with standard deviation](/assets/image-processing/c_code_two.PNG)

We were able to use the calculated standard deviation for each image **as a measure of noise level**. This allowed us to adjust the thresholds for **adaptive thresholding** more accurately and link this to noise detection and removal, resulting in clearer and **less noisy images**.


In addition to this, we also made improvements to the **line detection process**. This is a computationally intensive process, so we wanted to find ways to reduce the amount of time it would take. One of the ways we did this was by finding lines in the image that were not relevant to the grid we were trying to detect and removing these lines from the image **before launching the square detection algorithm**. This can be done using the following code:

![](/assets/image-processing/c_code_three.PNG)

![Line cleaning](/assets/image-processing/draw-lines.jpg)

Finally, we improved **the way the grid was detected**. In the previous version of our algorithm, we used **the coordinates of a line of maximum value** to detect the top left square of the sudoku grid. This approach worked well for some images, but not for others. In particular, it did not work well **for images that contained straight lines external to the sudoku grid**, as these lines could be interpreted as being part of the grid, resulting in incorrect detection of the grid and incorrect separation of its squares.


To address this issue, we have implemented a new version of the algorithm. In this version, we first detect the intersection point of the maximum coordinate lines towards the top of the image, as before. Then, we test whether there is another intersection point **of similar concentration** below the original point. This process is repeated until the algorithm no longer detects points that satisfy the conditions for continuing the loop. In parallel to this **"proximity descent"**, we keep track of the number of descents using a counter. The algorithm stops once the **maximum number of lines allowed in the sudoku grid is reached** (i.e. 9 or 16). If the algorithm does not detect enough (or too many) descents, **we conclude that the starting point was incorrect**, and the image processing is on the wrong track. We thus might choose another starting point and start again.



In some cases, the sudoku grid in the image may be too off-center or distorted by perspective, making it difficult to detect a pattern vertically using our new optimization. In such cases, we have made the algorithm start from the base point and **follow the same path but horizontally this time**. If neither of these two paths is able to detect a pattern, we can be sure that the image is not a sudoku, or is **too noisy to be processed**.


![Grid detection improvement](/assets/image-processing/10-draw_sudoku.jpg)




## Image splitting

Once the initial image had been processed and the sudoku grid had been detected, we needed a **function capable of separating each of the sudoku cells into 81 extracted sub-images**. The latter had to be of the same size and created in such a way that they all contained a single digit, if possible centred, to facilitate the task of the neural network which would be responsible for detecting the digit in question. Thus, and still using the SDL2_Image library used for pre-processing, we began to create a first prototype of the function allowing such the splitting of the parts of the given image. This function operated from **the coordinates of a point** in the picture provided as input to the program, as well as **a length and height value expressed in pixels**.

When executed, the program would calculate the horizontal and vertical distance in pixels of the area to be subdivided into small square images of **uniform size**. It then stored the dimensions of each of the tiles by dividing the previously calculated dimensions by 9 in order to separate the area into 81 sub-images. For each of the squares created, we allocated a certain portion of the area generated from the initial image provided and **defined a rectangle of corresponding size using the SDL_Rect structure**. This rectangle was then placed at the coordinates of the currently processed tile on the initial image and exported to a new file in BMP format **the area covered by the rectangle**.

The images were thus generated by progressing row by row in the sudoku grid as each of the cells were being partitioned: we therefore named the files **according to the indexes in the grid of the cell it was processing**. This naming convention will be particularly useful later on when we have to put each of the values identified by the neural network **into a text file to be processed by our sudoku solver**.

This first version, easy enough to implement, was then slightly improved **in order to ensure the uniformity of dimensions of each of the generated sub-images**. This would allow us to change the resolution of each of the images to a rather smaller square in order to limit the number of links in our future neural number detection network. In particular, we were thinking of resizing each image to a resolution of 28x28 pixels, thus limiting the neural network **to only 784 links per node or neuron** instead of far too many connections without this precaution. Once this function was completed, it was relatively simple to incorporate it after the image and sudoku grid processing: it is directly called as soon as the detection of the origin of the latter is determined.
