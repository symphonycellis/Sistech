// Get all blog posts
fetch('https://sistech-api.vercel.app/api/posts')
  .then(response => response.json())
  .then(posts => {
    const blogPostsElement = document.getElementById('blog-posts');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('card', 'mb-3');
      postElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
          <button class="btn btn-primary" onclick="likePost(${post.id})">Like</button>
        </div>
      `;
      blogPostsElement.appendChild(postElement);
    });
  });

// Submit new blog post
const newPostForm = document.getElementById('new-post-form');
newPostForm.addEventListener('submit', event => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const data = {
    title: title,
    content: content
  };

  fetch('https://sistech-api.vercel.app/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(post => {
    // Clear form
    newPostForm.reset();

    // Display new post
    const blogPostsElement = document.getElementById('blog-posts');
    const postElement = document.createElement('div');
    postElement.classList.add('card', 'mb-3');
    postElement.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.content}</p>
        <button class="btn btn-primary" onclick="likePost(${post.id})">Like</button>
      </div>
    `;
    blogPostsElement.appendChild(postElement);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Like a blog post
function likePost(postId) {
  fetch(`https://sistech-api.vercel.app/api/posts/${postId}/like`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    // Update the like count on the page
    const postElement = document.querySelector(`[data-post-id="${postId}"]`);
    const likeCountElement = postElement.querySelector('.like-count');
    likeCountElement.textContent = data.likes;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
