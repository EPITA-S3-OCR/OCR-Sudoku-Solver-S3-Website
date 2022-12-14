---
layout: "@layouts/BlogLayout.astro"
title: "Group presentation & motivations"
---

## Group members

### Eliott

According to me, this project is mostly about learning new methods and principles about neural networks and their uses **in a concrete problem**. Also, I haven't had the opportunity to work on image manipulation that much since I've started programming and I think it's **important to know the concept** behind some of the algorithms used in this project. Finally, I particularly appreciate to do some team work **especially so if I get on well with the people composing it**.

### David

For me, one of the most enriching aspects of the project was being able to work on neural networks **from the ground up**. To actually build one from scratch without relaying on external libraries such as PyTorch or TensorFlow ultimately provided **a much deeper understanding** on how each worked and the maths hidden behind it.
In addition to this, I had the opportunity to work on the sudoku solver, for which we made extensive researches to **find a faster method than brute-force backtracking**, landing eventually on Algorithm X with the Dancing Links implementation. This combination of mathematics and algorithms was deeply satisfying to understand because of **how challenging it was**.

### Raj

This project had two facets to it, the team and the project itself. Not only was the team work impeccable, the project itself involved some of the most used and relevant methods in industry today. This project allows us to first handedly work with neural networks and understand them. Not to mention it allows us to **learn about handling of images in programs**. Having a team also helped understand how other people think and the resources they use. For example working with this team allowed to me to learn about resources such as Notion as well as deepened my understanding of GitHub. All in all, the projects allows for the exchange of ideas between students as well as the discovery of different aspects of the Computer Science field.

### Titouan

The project is quite interesting for me since I've never done any image manipulation before, I was therefore interested in learning more about this domain. Moreover, for EpiKart (the **one and only** S2 project that matters) we tried (and failed) to develop a small AI with Unity Machine Learning capabilities. I became more and more curious about Artificial Intelligence and neural networks to then understand how it all worked at a lower level. I am also very happy to work with members of our group "ASM-Lovers". **I have already learned a lot for this first defense**, and I'm thrilled to what's coming with digit detection and **even more advanced image processing techniques**.

## Project setup & requirements

**Packages:**
After a bit of investigation, we found that the most useful packages available to us on Epita's computers sessions were:

- SDL2, to treat and process the image SDL2_Image **in order to easily convert images** from the file explorer.
- GTK+3, for building the **application's graphical user interface**.
- Google Test, a C++ framework for **unit testing**

**Styling:**
Before the beginning of the project, we took some time to decide together of **the way our code would be looking like** (indentation, spacing, etc) in order to have a uniform style for all team members. We thus used a handcrafted clang-format settings file **designed to respect Epita's ING coding style**. Every time a commit would be done on our group repository, the clang-format file would style the code for us, making it always **under 80 columns**, as asked in the book of specifications of the project.

**Testing \& continuous integration with GitHub:**
After any member commit A Github actions will run after each commit to run the make file and then proceed to unit testing and integration testing. It will **deploy a NixOS docker** with the same packages version as the EPITA VM in order to simulate their configurations as close as possible.

**Communication \& tools:**
We created and used a Discord server to communicate and share our ideas for the project. In addition, we used Notion to store everyone's texts for the reports in the same file, consultable and editable by all team members. To produce the report, we used Overleaf, an online web service allowing to write LaTeX reports more efficiently with a real time code compiler and PDF visualizer.

**Documentation:**
The Doxygen module is a tool for **generating documentation for C projects**. Doxygen can parse C source code and automatically generate detailed documentation, including **descriptions of classes, functions, and variables**. In the context of our project, we wanted to use Doxygen to help the jury and others understand the structure and implementation of our code. The generated diagrams and visual representations can also be useful for debugging and optimization.

**Website:**
We had the time to create a website to showcase our project. The website includes a brief introduction to the group members, as well as a link to our GitHub repository and technical reports. It was built using the **Astro JavaScript framework** and contains a link to the documentation talked about just earlier. The main motivation behind creating the website was **to practice some web development** and for everyone in the group to contribute to its creation. It also allows us to display our project in a more professional and organized manner, and to potentially share it with a larger audience. Having a website **streamlined the editing and organizing process**, making it easier for us to make changes and updates as needed.
