const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

/* Serve arquivos estáticos das pastas assets e data */
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/img', express.static(path.join(__dirname, 'img')));

/* Define rotas para as páginas HTML */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dev', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/Dev.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/blog.html'));
});



// E assim vai indo com suas outras páginas...

app.listen(3030, () => {
  console.log(`Index is running on 3030`);
});
