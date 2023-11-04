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