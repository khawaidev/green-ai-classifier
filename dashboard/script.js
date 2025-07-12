document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#results-table tbody');
      data.forEach(item => {
        const row = document.createElement('tr');

        const color = item.status === 'green' ? '🟢 green' : '🔴 red';

        row.innerHTML = `
          <td><a href="${item.url}" target="_blank">${item.url}</a></td>
          <td>${item.timestamp}</td>
          <td>${color}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
