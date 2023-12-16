document.addEventListener("DOMContentLoaded", async function () {
    const showFormButton = document.getElementById("showFormButton");
    const startThreadForm = document.getElementById("startThreadForm");
    const addThreadButton = document.getElementById("addThreadButton");
    const subjectInput = document.getElementById("subject");
    const commentsInput = document.getElementById("comments");
    const imageInput = document.getElementById("image");
    const threadsContainer = document.getElementById("threads");

    showFormButton.addEventListener("click", function () {
        if (startThreadForm.style.display === "none" || startThreadForm.style.display === "") {
            startThreadForm.style.display = "block";
        } else {
            startThreadForm.style.display = "none";
        }
    });

    addThreadButton.addEventListener("click", async function () {
        const subject = subjectInput.value;
        const comment = commentsInput.value;
        const image = imageInput.files[0];

        const threadContainer = document.createElement("div");
        threadContainer.classList.add("thread");

        threadContainer.innerHTML = `
            <h2>${subject}</h2>
            <p>${comment}</p>
        `;

        if (image) {
            const imageElement = document.createElement("img");
            const reader = new FileReader();
            reader.onload = function (e) {
                imageElement.src = e.target.result;
            };
            reader.readAsDataURL(image);
            imageElement.alt = subject;
            imageElement.style.maxWidth = "400px";
            imageElement.style.maxHeight = "400px";
            threadContainer.appendChild(imageElement);
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async function () {
            threadContainer.remove();
            await removeThreadDataFromServer(subject, comment);
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

        const commentInput = commentSection.querySelector("#commentInput");
        const addCommentButton = commentSection.querySelector(".add-comment-button");
        const commentsContainer = commentSection.querySelector(".comments");

        addCommentButton.addEventListener("click", async function () {
            const commentText = commentInput.value;
            if (commentText) {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");

                const commentTextElement = document.createElement("p");
                commentTextElement.textContent = commentText;
                commentElement.appendChild(commentTextElement);

                const deleteCommentButton = document.createElement("button");
                deleteCommentButton.textContent = "Delete";
                deleteCommentButton.addEventListener("click", async function () {
                    commentElement.remove();
                    await removeCommentFromServer(subject, comment, commentText);
                });
                commentElement.appendChild(deleteCommentButton);

                commentsContainer.appendChild(commentElement);
                commentInput.value = "";

                await storeCommentOnServer(subject, comment, commentText);
            }
        });

        threadsContainer.appendChild(threadContainer);

        subjectInput.value = "";
        commentsInput.value = "";
        imageInput.value = "";

        const threadData = {
            type: "thread",
            subject,
            comment: comment,
            image: image ? await convertImageToBase64(image) : null,
        };

        await storeDataOnServer(threadData);
    });

    async function loadThreadsFromServer() {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            const threads = await response.json();
    
            threads.forEach(async (threadData) => {
                if (threadData.type === "thread") {
                    const threadContainer = await createThreadElement(threadData);
                    threadsContainer.appendChild(threadContainer);

                    // Load image data from localStorage
                    const imageData = localStorage.getItem(`${threadData.subject}-${threadData.comment}-image`);

                    // Display the image
                    if (imageData) {
                        const imageElement = document.createElement("img");
                        imageElement.src = `data:image/png;base64,${imageData}`;
                        imageElement.alt = threadData.subject;
                        imageElement.style.maxWidth = "400px";
                        imageElement.style.maxHeight = "400px";
                        threadContainer.appendChild(imageElement);
                    }

                    // Load comments for the thread from the server
                    const commentsResponse = await fetch(`http://localhost:3000/api/comments/${threadData._id}`);
                    const comments = await commentsResponse.json();
                    const commentsContainer = threadContainer.querySelector(".comments");
    
                    comments.forEach(commentData => {
                        const commentElement = createCommentElement(commentData.comment, threadData.subject, threadData.comments);
                        commentsContainer.appendChild(commentElement);
                    });
                }
            });
        } catch (error) {
            console.error('Error loading threads from server:', error);
        }
    }

    async function createThreadElement(threadData) {
        return new Promise((resolve) => {
            const threadContainer = document.createElement("div");
            threadContainer.classList.add("thread");
    
            threadContainer.innerHTML = `
                <h2>${threadData.subject}</h2>
                <p>${threadData.comment}</p>
            `;
    
            if (threadData.image) {
                const imageElement = document.createElement("img");
                imageElement.src = `data:image/png;base64,${threadData.image}`;
                imageElement.alt = threadData.subject;
                imageElement.style.maxWidth = "400px";
                imageElement.style.maxHeight = "400px";
                threadContainer.appendChild(imageElement);
            }
    
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async function () {
                threadContainer.remove();
                await removeThreadDataFromServer(threadData.subject, threadData.comment);
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
    
            resolve(threadContainer);
        });
    }
    async function removeThreadDataFromServer(subject, comment) {
        try {
          const response = await fetch(`http://localhost:3000/api/data/${subject}/${comment}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            console.log('Thread deleted successfully');
          } else {
            console.error('Failed to remove thread data from server');
          }
        } catch (error) {
          console.error('Error removing thread data from server:', error);
        }
      }
      
      // Add a new function for removing comments
      async function removeCommentFromServer(subject, commentText) {
        try {
          const response = await fetch(`http://localhost:3000/api/comments/${subject}/${commentText}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            console.log('Comment deleted successfully');
          } else {
            console.error('Failed to remove comment from server');
          }
        } catch (error) {
          console.error('Error removing comment from server:', error);
        }
      }
    async function storeDataOnServer(data) {
        try {
            const response = await fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: data.type,
                    subject: data.subject,
                    comment: data.comment,
                    image: data.image,
                }),
            });

            if (!response.ok) {
                console.error('Failed to store data on server');
            }

            // Store image data in localStorage
            if (data.image) {
                localStorage.setItem(`${data.subject}-${data.comment}-image`, data.image);
            }
        } catch (error) {
            console.error('Error storing data on server:', error);
        }
    }


    async function storeCommentOnServer(subject, comments, commentText) {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${subject}/${comments}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentText }),
            });

            if (!response.ok) {
                console.error('Failed to store comment on server');
            }
        } catch (error) {
            console.error('Error storing comment on server:', error);
        }
    }


    function convertImageToBase64(image) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(image);
        });
    }

    function getStoredThreadsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("threads")) || [];
    }

    function setStoredThreadsInLocalStorage(threads) {
        localStorage.setItem("threads", JSON.stringify(threads));
    }

    // Load threads from the server when the page loads
    await loadThreadsFromServer();
});
