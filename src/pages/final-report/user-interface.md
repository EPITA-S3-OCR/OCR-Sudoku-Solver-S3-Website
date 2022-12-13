---
layout: "@layouts/BlogLayout.astro"
title: "User Interface"
---

After the first defense, we knew the major part until this new defense **was building the User Interface**. Some members of the group had already worked on **the design and creation of a user interface**. We wanted it to be as **clear**, **uncluttered** and **simplistic** as possible. We think that being able to use new tools for a new purpose is very important for an engineer.

To assist us in this task we used the **GTK-3.0 library**, a C library containing a lot of element structures in order to build simplified **but still low-level graphical interfaces**. The resulting window is in fact a **concrete representation of an XML** - or Extensible Markup Language - file. So, instead of having to manually move the position of several dozen elements through a code editor, we used Glade, **a software editor made to generate these famous XML files by offering an easy-to-use construction interface**. We could then easily add many buttons and features. The complex part was to adapt as well as to be able to emit and receive the signals of the various components of the window. We also **used CSS to embellish the look of some of our buttons and sliders to match the clean look we wanted to express**.

## Design phase \& ideas

In order to realize our first UI prototypes and to be sure to be able to implement a maximum of functionalities that we considered key, we first **went through a brainstorming and design stage using the collaborative work software Figma** that we talked about above. This is how we first created this **first visual prototype for our main window**. It would contain a few buttons to be able to load either one of the 6 images given in the specifications or simply another image from a sudoku grid provided by the user. We wanted the user to be able to see the rendering of the successive application of the filters live. We could also launch the training of our neural network thanks to 2 other buttons.

![First UI Design](/assets/ui/image2.png)

A little later, we decided to **drastically modify the first prototype we had developed a few days before**. This new version of the application contained much more features than the first one. Indeed, we could now choose the initial rotation of the studied image on the right of the screen. The image processing would **then find the right rotation to straighten the sudoku and thus be able to correctly identify the numbers that compose it**. We could also choose the type of sudoku we wanted to solve: a 9x9 size sudoku or a 16x16 size one (or hexadoku). We also wanted to give more information to the user about the live processing of the image on the sudoku grid: the "Verbose" option allowed to display, in a **kind of simulated terminal located below the image rendering**, the intermediate steps with precise details about them like the number of detected lines, etc. This mode was also **available for training the neural network**.

![Second UI Design](/assets/ui/image1.png)

The last version which was the final version of the project implemented **three separate parts in the interface**. With the use of 3 distinct tabs, we could thus mark the distinction between **the different steps in order not to lose the user in the large amount of functionality**. This new window design was purely aesthetic and did not bring any new features in itself.

![Last UI Design](/assets/ui/last.png)

## Final sudoku solution image renderer

To represent the solved sudoku grid, we used the MagickWand library to add text on the image according to the numbers **returned by our post-processing image resolution function**. The MagickWand API is a C-language API for the ImageMagick image manipulation library. ImageMagick is an **open-source library that provides tools for creating, modifying, and converting images in a variety of formats**. The MagickWand API provides a simple, high-level interface for accessing the capabilities of ImageMagick, which allows us to easily perform common image manipulation tasks such as resizing, cropping, and applying filters.
To use the MagickWand API, one would typically **create a new MagickWand object,** and then use various MagickWand functions to manipulate the image. No matter the transformations one could imagine a typical main function looking like this:

```c
#include <wand/magick_wand.h>

int main(int argc, char **argv)
{
  MagickWand *mw = NULL;

  // Initialize the MagickWand environment
  MagickWandGenesis();
  // Create a new MagickWand object
  mw = NewMagickWand();
  // Read the image file into the MagickWand object
  MagickReadImage(mw, "input.jpg");
  // Apply transformations like grayscale, drawing, etc…
  // Save the image to a new file
  MagickWriteImage(mw, "output.jpg");

  // Clean up and destroy the MagickWand object
  DestroyMagickWand(mw);
  mw = NULL;
  // Shut down the MagickWand environment
  MagickWandTerminus();

  return 0;
}
```
