document.addEventListener("DOMContentLoaded", function() {
    const showFormButton = document.getElementById("showFormButton");
    const startThreadForm = document.getElementById("startThreadForm");
    const addThreadButton = document.getElementById("addThreadButton");
    const subjectInput = document.getElementById("subject");
    const commentsInput = document.getElementById("comments");
    const imageInput = document.getElementById("image");
    const threadsContainer = document.getElementById("threads");

    showFormButton.addEventListener("click", function() {
        if (startThreadForm.style.display === "none" || startThreadForm.style.display === "") {
            startThreadForm.style.display = "block";
        } else {
            startThreadForm.style.display = "none";
        }
    });

    addThreadButton.addEventListener("click", function() {
        // Get input values
        const subject = subjectInput.value;
        const comments = commentsInput.value;
        const image = imageInput.files[0];

        // Create a thread container
        const threadContainer = document.createElement("div");
        threadContainer.classList.add("thread");

        // Display the subject and comments
        threadContainer.innerHTML = `
            <h2>${subject}</h2>
            <p>${comments}</p>
        `;

        // Display the image, capped at 400x400 pixels
        if (image) {
            const imageElement = document.createElement("img");
            const reader = new FileReader();
            reader.onload = function(e) {
                imageElement.src = e.target.result;
            };
            reader.readAsDataURL(image);
            imageElement.alt = subject;
            imageElement.style.maxWidth = "400px";
            imageElement.style.maxHeight = "400px";
            threadContainer.appendChild(imageElement);
        }

        // Create a delete button for the thread
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            threadContainer.remove();
            removeThreadDataFromLocalStorage(subject, comments);
        });
        threadContainer.appendChild(deleteButton);

        // Create a comment section for the thread
        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
        commentSection.innerHTML = `
            <h3>Comments</h3>
            <textarea id="commentInput" placeholder="Add a comment"></textarea>
            <button class="add-comment-button">Add Comment</button>
            <div class="comments"></div>
        `;
        threadContainer.appendChild(commentSection);

        // Handle adding comments to the thread
        const commentInput = commentSection.querySelector("#commentInput");
        const addCommentButton = commentSection.querySelector(".add-comment-button");
        const commentsContainer = commentSection.querySelector(".comments");

        addCommentButton.addEventListener("click", function() {
            const commentText = commentInput.value;
            if (commentText) {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");

                const commentTextElement = document.createElement("p");
                commentTextElement.textContent = commentText;
                commentElement.appendChild(commentTextElement);

                const deleteCommentButton = document.createElement("button");
                deleteCommentButton.textContent = "Delete";
                deleteCommentButton.addEventListener("click", function() {
                    commentElement.remove();
                    removeCommentFromLocalStorage(subject, comments, commentText);
                });
                commentElement.appendChild(deleteCommentButton);

                commentsContainer.appendChild(commentElement);
                commentInput.value = "";

                // Store the comment in local storage
                storeCommentInLocalStorage(subject, comments, commentText);
            }
        });

        threadsContainer.appendChild(threadContainer);

        // Reset form inputs
        subjectInput.value = "";
        commentsInput.value = "";
        imageInput.value = "";

        // Store data in local storage
        const threadData = {
            subject,
            comments,
            image: image ? URL.createObjectURL(image) : null
        };
        const storedThreads = getStoredThreadsFromLocalStorage();
        storedThreads.push(threadData);
        setStoredThreadsInLocalStorage(storedThreads);
    });

    // Load threads from local storage when the page loads
    const storedThreads = getStoredThreadsFromLocalStorage();
    storedThreads.forEach(threadData => {
        const threadContainer = createThreadElement(threadData);
        threadsContainer.appendChild(threadContainer);
    });

    // Helper functions for working with local storage
    function getStoredThreadsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("threads")) || [];
    }

    function setStoredThreadsInLocalStorage(threads) {
        localStorage.setItem("threads", JSON.stringify(threads));
    }

    function removeThreadDataFromLocalStorage(subject, comments) {
        const storedThreads = getStoredThreadsFromLocalStorage();
        const updatedThreads = storedThreads.filter(thread => {
            return thread.subject !== subject || thread.comments !== comments;
        });
        setStoredThreadsInLocalStorage(updatedThreads);
    }

    function createThreadElement(threadData) {
        const threadContainer = document.createElement("div");
        threadContainer.classList.add("thread");

        threadContainer.innerHTML = `
            <h2>${threadData.subject}</h2>
            <p>${threadData.comments}</p>
        `;

        if (threadData.image) {
            const imageElement = document.createElement("img");
            imageElement.src = threadData.image;
            imageElement.alt = threadData.subject;
            imageElement.style.maxWidth = "400px";
            imageElement.style.maxHeight = "400px";
            threadContainer.appendChild(imageElement);
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            threadContainer.remove();
            removeThreadDataFromLocalStorage(threadData.subject, threadData.comments);
        });
        threadContainer.appendChild(deleteButton);

        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
        commentSection.innerHTML = `
            <h3>Comments</h3>
            <textarea id="commentInput" placeholder="Add a comment"></textarea>
            <button class="add-comment-button">Add Comment</button>
            <div class="comments"></div>
        `;
        threadContainer.appendChild(commentSection);

        // Load comments from local storage
        const storedComments = getStoredCommentsFromLocalStorage(threadData.subject, threadData.comments);
        const commentsContainer = commentSection.querySelector(".comments");
        storedComments.forEach(commentText => {
            const commentElement = createCommentElement(commentText, threadData.subject, threadData.comments);
            commentsContainer.appendChild(commentElement);
        });

        // Handle adding comments to the thread
        const commentInput = commentSection.querySelector("#commentInput");
        const addCommentButton = commentSection.querySelector(".add-comment-button");
        addCommentButton.addEventListener("click", function() {
            const commentText = commentInput.value;
            if (commentText) {
                const commentElement = createCommentElement(commentText, threadData.subject, threadData.comments);
                commentsContainer.appendChild(commentElement);
                commentInput.value = "";

                // Store the comment in local storage
                storeCommentInLocalStorage(threadData.subject, threadData.comments, commentText);
            }
        });

        return threadContainer;
    }

    function createCommentElement(commentText, subject, comments) {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        const commentTextElement = document.createElement("p");
        commentTextElement.textContent = commentText;
        commentElement.appendChild(commentTextElement);

        const deleteCommentButton = document.createElement("button");
        deleteCommentButton.textContent = "Delete";
        deleteCommentButton.addEventListener("click", function() {
            commentElement.remove();
            removeCommentFromLocalStorage(subject, comments, commentText);
        });
        commentElement.appendChild(deleteCommentButton);

        return commentElement;
    }

    function storeCommentInLocalStorage(subject, comments, commentText) {
        const key = `${subject}-${comments}-comments`;
        const storedComments = getStoredCommentsFromLocalStorage(subject, comments);
        storedComments.push(commentText);
        localStorage.setItem(key, JSON.stringify(storedComments));
    }

    function getStoredCommentsFromLocalStorage(subject, comments) {
        const key = `${subject}-${comments}-comments`;
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function removeCommentFromLocalStorage(subject, comments, commentText) {
        const key = `${subject}-${comments}-comments`;
        const storedComments = getStoredCommentsFromLocalStorage(subject, comments);
        const updatedComments = storedComments.filter(comment => comment !== commentText);
        localStorage.setItem(key, JSON.stringify(updatedComments));
    }
});