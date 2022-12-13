---
layout: "@layouts/BlogLayout.astro"
---

# XOR Neural Network

## Introduction

The major part of the optical character recognition is creating a neural network that is able to **recognize digits from images**. Therefore, in order to familiarise ourselves with the concept of a neural network, the team set about creating one capable of correctly performing the "exclusive or" or **XOR operation on two 8-bit words**.

The XOR operation, often used to verify and confirm the integrity of a specific file after being in transit for example, called checksums, and much more, is a very simple **bitwise logical operation**. It takes two binary inputs and returns an appropriate output as defined in the truth table below.

At first a very simple neural network was implemented which was later improved once the team was able to grasp the essence of neural networks. This improved neural network was made using classes and includes a variety of new features such as being able to store a neural network in a file for later use.

![XOR truth table](/assets/neural-network/xor.png)

## Model characteristics

Neural networks always present **3 distincts layers**: **the input, hidden and output layer.** There could be as many nodes per layer as necessary and as many hidden layers as desired. The input layer can be defined as ultimately **containing the user inputs** and the output layer containing the **intelligently computed result**. The hidden layers constitute the real magic of the neural network since it’s where all the processes and adjustments take place and where the neural network learns and adapts.

For our XOR function, we only needed a very simple network. It was composed of an input layer containing **two nodes or neurons**, one for each user input. It also would only require only **one hidden layer composed of two neurons** and lastly a **single neuron for the output layer**.

![XOR model](/assets/neural-network/xor-model.png)

The model was then trained on tests batches with two inputs being 1-bit binary digits. After the training process completed, the output would be **compared with the expected output.** If the output did not match, the neural network would learn from its mistakes and **slightly adjust its parameters** to fix the issue on the next training batch as much as possible.

## Implementation

In this section, the process of the actual neural network will be explored. This will include the implementation of processes and terminology used in the field of neural networks.

### Initialization

The neural network learns by **adjusting each weights and biases of the links between the neurons** using previous result computations. When starting the training process, we thus needed to define two things : **the number of epochs**, or trainings with all the training data for one cycle, and a **random distribution of the weights and biases**. While bias provides a sense of flexibility for the neural network, weights allow it to express how much each node is worth and overall how much influence should each node have in the grand scheme of things. Also, it goes without saying that **the more epochs the neural network trains for, the more accurate it becomes over time**. Lastly, we made it so that each training batch would randomly choose the training set order.

Lastly, we randomly choose which training set to use to train the neural network.

### Forward propagation

To make sure the informations given by each weights and biases was fed to each nest layer during the computation of a training batch, we needed to use a specific process called **forward propagation**. It depicts the process of going from one layer to the next layer and is used to determine the value of each node from the next layer. It is found by doing a **linear combination of the weights and the value of each of the previous layer’s nodes**. Once that is done, it is passed in an activation function. These are used to introduce non-linearity to neural networks and squashes the input into a smaller range. For example, we used a **sigmoid function**, which returns a number between 0 and 1 smoothly making a transition between the two as it can be seen from its graphical representation. Once this process is applied to the output layer, a predicted output to the training set is created.

![Sigmoid function](/assets/neural-network/sigmoid-function.png)

### Backward propagation

Once the new value for the weights and the final computed answer for stored inside of the output neuron, we need to apply another process to actually allow the neural network to learn. This process, called **back propagation**, consists of finding the error between the actual value and predicted value and to therefore update the weights and basis of each node according to it. This calculation is made possible by applying the d**erivative of the sigmoid activation function** on the value of each node, using extra parameters such as an error threshold and a learning rate. Both forward and backward propagation are then used on each of the training sets available. Once that is done we start the next epoch.

## Improvements

In spite of these **very positive and encouraging results**, it is necessary to recall that the code used here was not properly organized **nor specially optimized**: indeed, as said before, it was a draft version developed quickly in order to grasp the concept of neural networks in general. Moreover, this first XOR neural network **was to be used in the future as a basis** or at least as a strong inspiration to help us develop the neural network allowing to recognize the numbers in sudokus. This was another reason for us to reorganize the code in order **to allow its improvement and emancipation later in the project**. Finally, the last reason to reorganize our code was the fact that it was all in one file, whereas it would be more **practical and readable** for us to separate and sort the different parts into sub-files.

Therefore, we started **to reorganize and recode our whole implementation**. The first thing we thought of was to use C structures. Indeed, just like classes in object-oriented programming, these structures allow us to create objects with various properties defined by us. We have thus created the **NeuralNetwork structure in a new sub-file**, allowing to create neural networks with defined parameters such as the number of layers, nodes per layer, etc. The main interest is not to have to duplicate parts of the code in case we want to create a different model for example. This sub-file contained the constructor of the NeuralNetwork structure object **defining and initializing the weights and biases of the different links between the layers at random** while allocating the memory necessary for the arrays storing them. We then placed in this same file all the functions allowing a direct manipulation of the neural network such as the entire process in charge of training the latter but also other useful functions such as the one **allowing the display of the success rate** and other interesting statistics during the training process. Finally, the rest of the procedures were separated in other sub-files and our initial file **was only used to call the different functions in the right order**.

We also wanted to directly implement the saving or the import of the biases and weights of the neural network links in or from any text file. We have therefore developed 2 modes of launching the executable, allowing either to train the neural network or to load a pre-trained brain to calculate a given value. To do this, we had to look at the writing and reading of text files in C. With our knowledge acquired in C# in the field, we **just had to find the equivalent of functions** already used in the past and we didn't have much trouble finding what we needed. Thus, after training the neural network, the executable file will by default create a text file containing the said values in a precise text format. If the user wished to **use a sequence of biases and weights predetermined by a previous training of the network**, it was enough for him to load the text file produced previously and to indicate the values to calculate. The program then created a new neural network instance and placed **the right values on the right links**.

To recap, after a draft version of the code, the team undertook **the task of rewriting an organized and clean version of the existing code**. This new version, reusable and expandable in the future, allows to train a neural network a certain number of times given by the user. it also allows to import a text file containing the values of **a pre-trained neural network** to determine the value of the XOR operation **on two binary words of 8 bits each**.


## Optical Character Recognition neural network

We knew that developing a neural network to detect numbers in a Sudoku grid **would be a crucial part of our project**. We wanted to start working on it as soon as possible to allow for ample experimentation and potential failures. We wanted to ensure that **we had enough time to develop and present a functional and efficient neural network** at the final defense.


To prepare for future development, we** restructured the code}. This would prevent us from having to rewrite a lot of code at a later stage. We also made sure to work on the project together **by organizing development sessions in person or via Discord**. This allowed for **faster and more efficient communication** between group members, and enabled us to address technical aspects of the implementation. This new method of collaboration allowed us to **move forward quickly and avoid misunderstandings**.


To begin, we created **a new branch** on our GitHub repository specifically for the development of the new neural network. This allowed us to keep the code for the neural network **performing the XOR logic operation separate**. We duplicated the existing code and planned to adapt it to our new needs. However, after about 2 weeks without working on the project, we found that we could **no longer generalize the neural network as we had intended**. Despite our efforts to clearly name the data structures and define their roles, the code was **difficult to understand**.


We went back and added comments to the code and made **the main file clearer and more concise**. We also ensured that the code was properly annotated, especially since some loops were only adapted for a specific case. This allowed us to better **identify the values that needed to be modified** to create the neural network we wanted. We also created macros that we could easily modify to change the number of neurons per layer in the network.



In our project, we planned to train the network on 28x28 pixel images. This required **784 neurons on the input layer** of the neural network. Each of these neurons is connected to the second layer, or hidden layer, of the network, which has 16 neurons. This value was chosen based on research and reading articles on the subject. **16 neurons is often considered sufficient** for this type of neural network, but the number can be higher. We started with this number, remembering that it may change later. Our **output layer had 9 neurons, one for each potential digit to be identified in the image**.


![Model of the OCR neural network](/assets/neural-network/digitmodel.png)


However, we discovered that our network could **only produce a single result**. For the network performing the XOR logic operation, there were only **two possible results: 1 or 0**. We had only one neuron on the final layer, and determined the interpretation of the network by rounding the final value to the nearest integer. For our new network, we needed **to obtain the results for each of the 9 neurons on the last layer**. These results could be interpreted as a sort of percentage of certainty regarding the interpretation of the number by the network.


We therefore had to modify the way learning **was propagated forward and backwards during the back-propagation process**. This required changing some major parts of the code, which also allowed us to identify **some computational errors** in our code due to accesses **outside of certain arrays and resulting in unexpected behaviours**. These changes also affected the way we imported and saved the weights and biases, **since we only had one possible output result before**. Finally, we had to change the way we determined the interpretation of the network and checked if it was correct. Previously, we could check the result directly by performing the XOR operation in C and comparing it to the rounded value **in the single neuron of the output layer**. Now, we had to go through the array containing all the final values of the output layer and **determine the maximum value**. Its index, increased by 1, **constituted the value interpreted by the neural network**. To verify this, we were **labelling the image to be detected before training** the network on the current epoch, and used this result to affirm or deny the result calculated by the network.
Once all these modifications were made, we wanted to test our network on some images we had made by hand in an editing software. These images were correctly sized and binarized, containing only white or black pixels. Using new commands set up to test the code from a terminal, we specified the path to the folder containing these images and a certain number of epochs to perform. We just wanted to see if the program could get some conclusive results; **we didn't expect it to perform well from the first tests**.


However, when we started the tests, we quickly realized that the network **was not able to train itself properly** and learn from its mistakes during the calibration phase. After making sure to display the values in the last layer of the network, we saw that each of the 9 neurons tended, over time, **towards a probability of certainty of 1/9** and more generally of **$1/n$ with $n$ being the number of neurons in the output layer**. We didn't understand what could be causing this, especially since we had already checked our code several times and it was supposed to work in theory.



Confident in the validity of our code, we went online and **read many articles and other resources but without success**. All of them confirmed that our implementation of the **stochastic gradient descent and forward and backward propagation algorithms was correct**.



Going back to our code, we started to display most of the arrays containing the weights and biases of each neuron to potentially detect either a memory allocation problem not indicated by the compiler or to see if some values were inconsistent or abnormal. After a few days of research, we realized that from a certain epoch onwards, some of our biases - especially in the hidden and output layers - **were sometimes assigned the value NaN due to a division by 0 at some point in our program**. After more research, we learned that this phenomenon is referred to as **having an "explosive gradient"** and that our activation function, the **sigmoid**, was the source of the problem. For positive values higher than 15, the calculation of the activation value of any neuron was like **dividing 1 by 0**. After modifying it, we managed to train the neural network **with a success rate of about 85\%**. However, we only trained the network with about ten images, putting this result in perspective because **it was likely due to over-training rather than a stable and reliable success rate**.



To improve the performance of our neural network, we made some minor adjustments, such as **displaying more elements in the console**. We also needed to train the neural network on a **larger image database than the original one**. This was necessary because we wanted the network to be able to detect images in **both ideal conditions and in cases where they were noisier and more difficult to recognize**.



To achieve this, we needed to be able to **generate a training image database**, as well as determine an efficient and quick way to load the entire database. We also had to consider **how the network would select the images to train on during an epoch**. These challenges required careful planning and implementation.



To create a bank of images to train our neural network, we wrote a **Python script to generate JPEG images of size 28x28 pixels**. These images were binarized, meaning that they only contained black or white pixels. In order to test the capabilities of our neural network, we generated images in **both ideal conditions** (i.e. containing a centered, unbroken and straight, readable figure) and **more complex, noisy conditions**. Each image contained a single number or letter, written in a different font **from the Google Fonts API**. We used the Asyncio Python module to **download the fonts in an asynchronous manner** to reduce the length of each generation and the Pillow module to generate the images **in multiprocessing mode for faster generation**. This script was also used **to generate soluble sudoku grids of sizes 9x9 and 16x16 for further testing**.


<figure>
  <div class="flex justify-center">
    <img src="/assets/neural-network/sudoku9x9.png" alt="Neural Examples">
    <img src="/assets/neural-network/sudoku16x16.png" alt="Neural Examples">
  </div>
  <figcaption>Examples of a generated grid 9x9 and 16x16</figcaption>
</figure>


After considering several options, we decided **to load all the images from the image bank at the start of the training phase**. Each of the loaded images was **divided into sub-folders containing 9 images** each, from 1 to 9. An epoch consisted of choosing one of the sub-folders - or training sets - at random and **training the neural network on the 9 images contained in it**. This approach allowed the neural network to avoid over-training and be exposed to new images on a regular basis. Additionally, the images **were not processed in logical ascending order** within the same training set in order to avoid biasing the neural network and creating recognizable patterns.


Using our system, we were able to run multiple training sessions of about **10000 epochs each on a database of  images under ideal conditions**. The neural network improved over time and began producing **very good results**. We then modified the training database by adding images where the figure was sometimes slightly tilted, and by varying the fonts and line thicknesses. As the neural network continued to provide convincing results, we added even more noisy images to the image bank using noise maps and filters that might be difficult for a human to identify. After several training sessions, the neural network **achieved a success rate of about 94\% on more than 150k epochs in total**.



Satisfied with the relatively low error rate we were able to achieve, we wanted **to test our neural network on a Sudoku grid image**. We connected the end of the image processing process, which included detecting the lines and locating the boxes in the image. We resized each of the **81 images to be 28x28 pixels**, which made them readable by our neural network. The images were also binarized to contain only white or black pixels. However, when we started testing, we realized that our network **had not been trained to recognize an empty box**. We had indeed omitted the fact that a grid cell could be empty or contain a cluster of white pixels from one of the processing steps. We initially thought of **adding a neuron to the final layer** and retraining the network to detect this type of case. However, after further thought, we realized we could avoid this modification and save time by **simply detecting the number of white pixels in each of the images**. If this number exceeded a certain threshold, it was likely that the box contained a number rather than noise or nothing at all. This process also made the detection faster because **we did not need to identify the detected images as empty in the network**.




During the image processing phase, we had to re-adapt our **approach to reduce the noise created** by the application of successive filters as much as possible. While we managed to remove a significant amount of noise, a small part remained undetectable **without doing a case by case analysis**. However, this represented a very small part and was therefore negligible compared to the amount of noise we were able to remove.




The training process of the network took longer with the addition **of a few hundred extremely noisy images**. Therefore, we created a new launch option that allowed us to load a neural network instance from a text file containing the values of the weights and biases of each link, and to **train the instance created from the previous adjustments**. At the end of the training, a new text file was written with the updated values of the new neural network. This allowed us to continue **training the same neural network in multiple runs, with different test data and a specific number of epochs**.




With all these modifications in place, **we were able to test our neural network on images of Sudoku grids**. The empty cells in the image were perfectly identified and transcribed in the prediction of the final Sudoku grid. Most of the boxes containing numbers were also correctly identified, but **some predictions were sometimes very far from reality**. This was particularly the case for **6s that were often interpreted as 8s or for 4s that were seen as 9s**. To improve the network's detection of these numbers, we simply generated a larger quantity of images containing specifically these numbers and re-trained the neural network.




After several dozen new tests, we were finally able to identify **almost all the digits of the Sudoku grid provided as input**. Using the Sudoku generator, we were able to compare the results of several hundred Sudoku grids with the entire interpretation of the neural network.




Once we were confident in the accuracy our neural network could reach, **we launched a test and training session overnight** to generate a text file containing the weights and biases of the best possible result. **This file is included in our repository and will be used to test some grids during the final presentation of the project**.




We also **cleaned up the code** hierarchy by adding new types of structures, such as a structure for each of the input, hidden, and output layers, containing a new structure for each neuron with a value and a list of links to the rest of the nodes. This allowed us to **avoid working with large arrays and potentially add multiple hidden intermediate layers if necessary**. Our neural network only used one hidden layer, but we could have added another without significantly impacting its performance.




One potential improvement that we considered but did not implement was the use of a different activation function: **the softmax function**. It is often used in machine learning to predict the probability of an event and in classification models, where it allows predicting the probability of belonging to each possible class. The softmax function is an extension of the **sigmoid activation function**, which is typically used **for binary classification case****s**.

![Softmax graph](/assets/neural-network/softmax.png)
