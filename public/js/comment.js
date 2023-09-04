const newFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const post_id = event.target.dataset.postid
  console.log(post_id)
    if (content && post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };



document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);