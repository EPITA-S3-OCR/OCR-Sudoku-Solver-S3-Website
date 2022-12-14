---
layout: "@layouts/BlogLayout.astro"
title: "Grid detection"
---

One of the major parts of the project was obviously the processing of the image of the sudoku grid provided by the user when the program is launched. We will therefore present this part **by applying each of the processing functions successively in the chronological order** in which they appear in our code. We will use one of the grid images **provided in the book of specifications** of the project to illustrate our points and to observe more precisely the effects of **each stage of the process**.

![The original image](/assets/image-processing/sudoku5.jpg)

The first step before starting the processing was to be able to load and convert the studied image into a surface using the SDL_Surface structure of the SDL2_Image graphics library. The latter allows **any image to be imported from the file explorer and converted into different formats**.

## Grayscale

The first transformation that had to be done was the conversion of an image containing color data in the RGB format to a grayscale image or in other words an image **where every pixel has different hues of black and white exclusively**. This modification of the image is necessary in order to be able to detect more elements in the image later on **without requiring too much computation**.

This conversion was then applied to each pixel of the image using the following formula, assigning a different coefficient for each colour . The fact that these **coefficients are all distinct** is important, especially for the detection of lines in the image, which we will see later in this section.

$$
Gray = R * 0.2126 + G * 0.7152 + B * 0.0722
$$

![Image after grayscale step](/assets/image-processing/1-grayscale.jpg)

## Enhancements

### Contrast

We now needed to boost the contrast of the processed image to allow the program **to detect as many elements as possible afterwards**. Indeed, images of sudoku grids** are rarely contrasted**, unlike an image of a landscape for example. This is done by going through each pixel and comparing its now-grayscaled value **to the highest value of every pixel**. The color difference is thus increased in order to be able later to distinguish more easily edges of shapes like the **sudoku grid corner**s and so on.

### Image invertion process

It was then required to invert the colours to normalize it properly. This was done by applying the following formula **on each individual pixel**.

$$
NewPixelValue = 255 - PixelValue
$$

## Brightness normalization

After that, we wanted to normalize the image to further increase the contrast and to prepare for the **edge detection process**. This normalization process scales the brightness values of the active layer so that the darkest point **becomes black** and the brightest point **becomes as bright as possible**.
We find thus had to find the pixel with the highest value in the image and to apply the following formula to the rest of the pixels of the image **separately**.

$$
    NewPixelValue = 255 - \left(\frac{255}{MaxPixelValue} * PixelValue\right)
$$

![Image after brightness normalization step](/assets/image-processing/2-contrast.jpg)

## Noise reduction

Since most of the images that will be processed will come from a digital camera, it was necessary to minimise the noise caused by a variety of different sources which could directly impact on the detection quality of the sudoku grid. Specifically, in the case of computer vision, if the noise wasn't at least partially removed it could create errors in further treatment by for example **detecting a square that doesn't exist**.

To start the process of noise reduction we had to create a copy of our image because the denoising process works **by sampling and inputting in different batches of pixels**. Therefore, the copy prevented the same image from being modified by every current computations.

### Median filter

The first step toward noise reduction, in our image processing approach, was applying a median filter. We take all the 9 neighbors of a specific pixel and store them in an array. The array would then be sorted and the middle element, called **median**, would be picked and replace the nine other pixels color values. We preferred to use a median filter instead of a basic average one because we experienced **better results with one than the other**.

### Gaussian blur

The second step of noise reduction in the Gaussian blur technique which itself is actually a variant of an average blur algorithm. This process normally requires **ponderating each pixel around the pixel** to be blurred by a specific matrix of values. For faster computations, the used matrix for our Gaussian blur is contains values rounded to the pascal triangle. We therefore multiply each pixel around the pixel we are currently modifying by its corresponding value in the Gaussian blur matrix.

$$
GaussianMatrix =
\begin{pmatrix}
1 & 2 & 1 \\
2 & 4 & 2 \\
1 & 2 & 1 \\
\end{pmatrix}
$$

![Image after noise reduction step](/assets/image-processing/3-denoise.jpg)

## Local threshold

The image then needed to be flattened and a compensation for exposition disparity was required. In fact, some alteration could lead to bad interpretation if the latter case wasn't taken care of. We therefore used **a local thresholding technique** instead of a general one because some images might have a different exposition level. This part is called "**binarization**", which means that the output pixels array contains only pixels having the value white or black. The algorithm then computes the threshold or the average of the 9 pixels around the current pixel. It loops through each pixel assigns it the color **white if the current pixel is above the threshold, black otherwise**.

![Image after local threshold step](/assets/image-processing/4-local_threshold.jpg)

## Sobel edge detection

The Sobel edge detection is the last step of the image processing. It enables and begins the detection of the lines in the next algorithm. This technique very much **enhances the lines of the image by changing the pixels of shape borders to the color white**. We therefore started by inverting the entire image pixels array using the following matrices as operators called "Sobel operators".

$$
G_X =
\begin{pmatrix}
+1 & 0 & -1 \\
+2 & 0 & -2 \\
+1 & 0 & -1 \\
\end{pmatrix} \cdot A \text{ \ and \ }
G_Y =
\begin{pmatrix}
+1 & +2 & +1 \\
0 & 0 & 0 \\
-1 & -2 & -1 \\
\end{pmatrix} \cdot A
$$

We calculated both operators in the x and y direction and sum those two products. Depending on the computed value, we compare it to the **middle gray color in RGB fomat** (255/2) and set it to white or black accordingly.

<figure>
  <div class="grid grid-cols-1 md:grid-cols-2 justify-center gap-8">
    <img src="/assets/image-processing/sudoku5.jpg" alt="Original example image" />
    <img src="/assets/image-processing/5-sobel.jpg" alt="Image after Sobel edge detection" /> 
  </div>
  <figcaption>Comparison Original Image VS Image after sobel edge detection</figcaption>
</figure>
