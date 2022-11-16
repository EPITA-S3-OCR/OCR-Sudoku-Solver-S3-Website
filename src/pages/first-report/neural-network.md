---
layout: "@layouts/BlogLayout.astro"
---

# XOR Neural Network

## Introduction

The major part of the optical character recognition is creating a neural network that is able to **recognize digits from images**. Therefore, in order to familiarise ourselves with the concept of a neural network, the team set about creating one capable of correctly performing the "exclusive or" or **XOR operation on two 8-bit words**.

The XOR operation, often used to verify and confirm the integrity of a specific file after being in transit for example, called checksums, and much more, is a very simple **bitwise logical operation**. It takes two binary inputs and returns an appropriate output as defined in the truth table below.

At first a very simple neural network was implemented which was later improved once the team was able to grasp the essence of neural networks. This improved neural network was made using classes and includes a variety of new features such as being able to store a neural network in a file for later use.

![XOR truth table](/assets/neural-network/xor.png)

<!-- ![XOR truth table](../assets/neural-network/xor.png) -->

## Model characteristics

Neural networks always present **3 distincts layers**: **the input, hidden and output layer.** There could be as many nodes per layer as necessary and as many hidden layers as desired. The input layer can be defined as ultimately **containing the user inputs** and the output layer containing the **intelligently computed result**. The hidden layers constitute the real magic of the neural network since it’s where all the processes and adjustments take place and where the neural network learns and adapts.

For our XOR function, we only needed a very simple network. It was composed of an input layer containing **two nodes or neurons**, one for each user input. It also would only require only **one hidden layer composed of two neurons** and lastly a **single neuron for the output layer**.

![XOR model](../assets/neural-network/xor-model.png)

The model was then trained on tests batches with two inputs being 1-bit binary digits. After the training process completed, the output would be **compared with the expected output.** If the output did not match, the neural network would learn from its mistakes and **slightly adjust its parameters** to fix the issue on the next training batch as much as possible.

## Implementation

In this section, the process of the actual neural network will be explored. This will include the implementation of processes and terminology used in the field of neural networks.

### Initialization

The neural network learns by **adjusting each weights and biases of the links between the neurons** using previous result computations. When starting the training process, we thus needed to define two things : **the number of epochs**, or trainings with all the training data for one cycle, and a **random distribution of the weights and biases**. While bias provides a sense of flexibility for the neural network, weights allow it to express how much each node is worth and overall how much influence should each node have in the grand scheme of things. Also, it goes without saying that **the more epochs the neural network trains for, the more accurate it becomes over time**. Lastly, we made it so that each training batch would randomly choose the training set order.

Lastly, we randomly choose which training set to use to train the neural network.

### Forward propagation

To make sure the informations given by each weights and biases was fed to each nest layer during the computation of a training batch, we needed to use a specific process called **forward propagation**. It depicts the process of going from one layer to the next layer and is used to determine the value of each node from the next layer. It is found by doing a **linear combination of the weights and the value of each of the previous layer’s nodes**. Once that is done, it is passed in an activation function. These are used to introduce non-linearity to neural networks and squashes the input into a smaller range. For example, we used a **sigmoid function**, which returns a number between 0 and 1 smoothly making a transition between the two as it can be seen from its graphical representation. Once this process is applied to the output layer, a predicted output to the training set is created.

![Sigmoid function](../assets/neural-network/sigmoid-function.png)

### Backward propagation

Once the new value for the weights and the final computed answer for stored inside of the output neuron, we need to apply another process to actually allow the neural network to learn. This process, called **back propagation**, consists of finding the error between the actual value and predicted value and to therefore update the weights and basis of each node according to it. This calculation is made possible by applying the d**erivative of the sigmoid activation function** on the value of each node, using extra parameters such as an error threshold and a learning rate. Both forward and backward propagation are then used on each of the training sets available. Once that is done we start the next epoch.

## Improvements

In spite of these **very positive and encouraging results**, it is necessary to recall that the code used here was not properly organized **nor specially optimized**: indeed, as said before, it was a draft version developed quickly in order to grasp the concept of neural networks in general. Moreover, this first XOR neural network **was to be used in the future as a basis** or at least as a strong inspiration to help us develop the neural network allowing to recognize the numbers in sudokus. This was another reason for us to reorganize the code in order **to allow its improvement and emancipation later in the project**. Finally, the last reason to reorganize our code was the fact that it was all in one file, whereas it would be more **practical and readable** for us to separate and sort the different parts into sub-files.

Therefore, we started **to reorganize and recode our whole implementation**. The first thing we thought of was to use C structures. Indeed, just like classes in object-oriented programming, these structures allow us to create objects with various properties defined by us. We have thus created the **NeuralNetwork structure in a new sub-file**, allowing to create neural networks with defined parameters such as the number of layers, nodes per layer, etc. The main interest is not to have to duplicate parts of the code in case we want to create a different model for example. This sub-file contained the constructor of the NeuralNetwork structure object **defining and initializing the weights and biases of the different links between the layers at random** while allocating the memory necessary for the arrays storing them. We then placed in this same file all the functions allowing a direct manipulation of the neural network such as the entire process in charge of training the latter but also other useful functions such as the one **allowing the display of the success rate** and other interesting statistics during the training process. Finally, the rest of the procedures were separated in other sub-files and our initial file **was only used to call the different functions in the right order**.

We also wanted to directly implement the saving or the import of the biases and weights of the neural network links in or from any text file. We have therefore developed 2 modes of launching the executable, allowing either to train the neural network or to load a pre-trained brain to calculate a given value. To do this, we had to look at the writing and reading of text files in C. With our knowledge acquired in C# in the field, we **just had to find the equivalent of functions** already used in the past and we didn't have much trouble finding what we needed. Thus, after training the neural network, the executable file will by default create a text file containing the said values in a precise text format. If the user wished to **use a sequence of biases and weights predetermined by a previous training of the network**, it was enough for him to load the text file produced previously and to indicate the values to calculate. The program then created a new neural network instance and placed **the right values on the right links**.

To recap, after a draft version of the code, the team undertook **the task of rewriting an organized and clean version of the existing code**. This new version, reusable and expandable in the future, allows to train a neural network a certain number of times given by the user. it also allows to import a text file containing the values of **a pre-trained neural network** to determine the value of the XOR operation **on two binary words of 8 bits each**.
