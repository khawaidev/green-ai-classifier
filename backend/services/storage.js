const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'green-pages.json');

const save = (data) => {
  let pages = [];
  if (fs.existsSync(dbPath)) {
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    if (fileContent) {
        pages = JSON.parse(fileContent);
    }
  }
  pages.push(data);
  fs.writeFileSync(dbPath, JSON.stringify(pages, null, 2));
};

module.exports = { save };