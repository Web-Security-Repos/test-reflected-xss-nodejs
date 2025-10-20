// index.js
const express = require('express');
const app = express();

// Simple page with a reflected XSS vulnerability.
// It takes ?q=... from the query string and echoes it directly into the HTML.
app.get('/', (req, res) => {
  const q = req.query.q || '';
  // <-- Vulnerable sink: unescaped user input injected into HTML
  res.send(`
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Search</title></head>
      <body>
        <h1>Search</h1>
        <form method="get" action="/">
          <input name="q" value="${q}">
          <button type="submit">Search</button>
        </form>

        <h2>Results for: ${q}</h2> <!-- reflected XSS here -->
        <div id="results">
          Showing fake results for "${q}"
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
