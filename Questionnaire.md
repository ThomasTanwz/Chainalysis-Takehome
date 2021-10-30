### Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?

Due to limited given time, I used a serverless function for API requests and processing. The function was easy
to write and maintain, but it gives less control in terms of the backend system of this project. I wanted to focus 
more on the front end for this assignment, and therefore used a relatively simple approach to my backend design.

### Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

First, the moving background was not necessary for the webpage's functionalities,
but I found it interesting and decided to keep it.

Second, the visualization part was not necessary to satisfy the minimal requirements of this assignment.
I think a visualized chart can help the audience achieve a better and more direct understanding of the
exchanges' data. Therefore, I decided to use a bar chart in this assignment.


### If you have to scale your solution to 100 users/second traffic what changes would you make, if any?

In this web application, each user will make 2 requests to our back-end for Exchange 1 and Exchange 2.
Therefore, the total traffic will be 100 users * 2 (requests/user) / second = 200 requests / sec. 

The existing back-end of this web application is written in Node.js, which is a single-threaded, asynchronous
environment. This means that 200 requests are pushed to the back-end's task queue every second!

To handle a larger traffic like this, I will use a multi-threaded language/framework such as **Spring Boot** as the 
back-end server. I can then build a multi-threaded server that handles tasks synchronously.

### What are some other enhancements you would have made, if you had more time to do this implementation
1. A more sophisticated back-end server and pipeline for data handling and processing.
2. Better layout for my front-end. Instead of using "div soup"(divs everywhere), I will use proper React elements for a
better structure of my components.
3. More concise and readable code. I will create more functions and components for better readability and code 
maintenance. Instead of everything inside the App(), I will use multiple components and plan their layout accordingly. 