document.addEventListener('DOMContentLoaded', () => {
  const content = document.body.innerText;
  const url = window.location.href;

  fetch('https://green-ai-classifier.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, content }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Classification result:', data.result);
    })
    .catch(error => {
      console.error('Error sending content for classification:', error);
    });
});
