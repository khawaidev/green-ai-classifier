document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#results-table tbody');
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.url}</td>
          <td>${item.timestamp}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});