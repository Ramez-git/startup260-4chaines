# startup260
My idea's name is BYUchan it is basically a platform were people can share images and thoughts anonymously trough chat rooms that enables other people to comment on the initial post and share their ideas, the site will have various chatrooms for various topics.
HTML: It will provide the structure and content of the web page by using elements like headings, paragraphs, lists, and links.
CSS: will be used for styling
Javascript:will be used for posting comments, expanding threads, and managing the display of images.
Web service: might be used to fetch external content, such as advertisements, or to connect with other services for features like link previews or user authentication.
Authentication: will be used to manage user accounts, track user activity, and ensure that certain features, like posting and moderating, are only accessible to authenticated users.
Database Persistence: will be used to store and retrieve user-generated content, such as posts and images. 
WebSocket: will be used to enable real-time updates, such as new posts appearing in a thread without the need for manual page refreshes. It also facilitates live chat or notification features.
Web Framework: may be used to help streamline the development process, handle routing, and manage server-side logic efficiently.

I have finished programming the HTML part of my site and this is what I have done:
I have started with setting the language of the websit to english, then added a title and an icon to the website, I have added a header which includes an image and title of the website, I have then added the sign in and up buttons in the navigation part of the page, I have then added some text and hyperlinks for the pages that my website leads to as a table in a menu, at the end I have added my name and github link in the footer. I have not used a body as I did not need to in this page.
I have then wrote all of the other pages(rooms) in my website all have the same basic design starting with an image and title(in the header) as well as a back button and some text(in the body) I have also created a couple of buttons to create a thread and also the threads section which includes all the threads the users have created(it will be implemented and live once we learn about databases).

I have finished programming the CSS part of the website and this is what I have done:
 In the main page I have set all of the font to sans-serif and aligned all the text to center as well as items, then I have set the display of nav to flex to addapt to diffrent screens and I also centerd it with margin of 0, then I have changed the margin of table to -1em because there was a gap between the text and the table, then I have added 10px of margin to each element of the table, I have also changed the background of the body to include two colors together in a nice design. I have then modified h1 in header to make it centered, I have changed the color of all links to be black and have not underline but when you hover over it, it will underline the link.
 I have wrote the same design for all the other pages.  

JS:
Initialization: The code begins by setting up event listeners and initializing variables to work with various elements in your web page, such as buttons, forms, input fields, and containers.
Toggle Form: The "Start a thread" button allows users to toggle the visibility of the thread creation form. Clicking the button either displays or hides the form, depending on its current state.
Adding Threads: When the user clicks the "Submit" button in the form, the code collects data from the subject input, comments input, and an optional image upload. It then creates a new thread container to display this data.
The thread container displays the subject and comments.
If an image is uploaded, it displays the image with a maximum size of 400x400 pixels.
Each thread includes a "Delete" button for removing the entire thread.
Comment Sections: Each thread also contains a comment section that allows users to add comments. Users can input text, click "Add Comment," and the new comment is displayed along with a "Delete" button to remove that specific comment.
Local Storage: The code makes use of local storage to store and retrieve data. It stores information about threads and comments, including subject, comments, and images, in the user's browser. This allows the page to remember and display previously created threads and comments even after the user leaves or reloads the page.
Loading Threads from Local Storage: When the page loads, it checks the local storage for previously created threads and comments. It then recreates these threads with their associated comments, subject, and images, providing a seamless user experience.


1. HTTP Service using Node.js and Express:
I set up a Node.js project and initialized it using npm init.
I installed the necessary dependency (express) using npm install express.
I created a file named server.js for my Express application.
I wrote JavaScript code in server.js to set up an Express server, specifying that it should listen on port 3000. This file serves as the backbone of my HTTP service.

2. Frontend Served Up Using Express Static Middleware:
I created a directory named public to store static frontend files.
I added an HTML file (index.html) inside the public directory.
I used Express static middleware to serve static files.
In server.js, I added code to instruct Express to serve static files from the public directory. This allows my frontend files to be accessible to users.

3. Frontend Calls Third-Party Service Endpoints:
In the HTML file (index.html), I used JavaScript to make a fetch request to a third-party API endpoint.
I displayed the response in the HTML page.
Inside the index.html file, I implemented JavaScript code to fetch data from a third-party service using the Fetch API. I handled the response and displayed it in the HTML.

4. Backend Provides Service Endpoints:
I added service endpoints to the Express server (server.js).
I created custom endpoints, e.g., /api/third-party-data and /api/custom-endpoint.
In server.js, I defined routes to handle specific endpoints. For instance, I created an endpoint to fetch data from a third-party service and another one for a custom endpoint.

5. Frontend Calls Your Service Endpoints:
In the HTML file (index.html), I used JavaScript to make fetch requests to the custom endpoints provided by the backend.
Inside index.html, I incorporated JavaScript to make requests to the custom endpoints of my backend. This allows my frontend to interact with and consume data from the backend.

By following these steps, I've established a full-stack application with a Node.js backend using Express, a frontend serving static files, and the ability for the frontend to make requests to both third-party services and my custom backend endpoints.



Database:
In this updated server.js file, I've enhanced the server's capabilities to handle both text and image data. Leveraging the Express framework for server creation, Mongoose for MongoDB interactions, and Multer for efficient file uploads, I've now equipped the server to seamlessly manage diverse types of content. The MongoDB schema has been updated to include fields for both text (text) and image (imagePath) data. The Multer middleware is configured to handle file uploads, enabling the server to receive images through the '/saveData' endpoint. This endpoint not only accepts text data in the request body but also processes file uploads for images, storing both types of data in the MongoDB database under the 'DataModel' collection. Additionally, a '/getData' endpoint facilitates the retrieval of all stored data, providing a comprehensive view of text and image entries.

This server exemplifies a versatile solution, catering to applications that require the storage and retrieval of diverse content types. The integration of Multer streamlines the handling of image uploads, while the MongoDB database ensures efficient data storage. Developers can now interact with the server to save and retrieve text and image data, paving the way for applications that involve multimedia content storage and retrieval.



Authenication:
I implemented a basic authentication system using a combination of client-side (HTML and JavaScript) and server-side (Node.js, Express, and MongoDB) components. The HTML file defines a simple form with input fields for username and password, and a button triggering the signInUp function on click. The JavaScript function uses the Axios library to send an HTTP POST request to the server's /authenticate endpoint, providing the entered username and password. The server, written in Node.js with Express, connects to a MongoDB database and defines a schema and model for user information. The /authenticate endpoint checks if a user with the provided credentials already exists in the database. If so, it responds to the client with an indication that the user exists, triggering a "Welcome back" alert. Otherwise, it adds the new user to the database and responds to the client, prompting a "Successfully registered" alert.

This implementation is a simplified example meant for educational purposes. In a production environment, it is crucial to enhance security measures, implement proper password hashing, and consider additional layers of authentication to ensure the safety of user data. Furthermore, error handling, validation, and securing communication between the client and server would be essential for a robust and secure authentication system.
