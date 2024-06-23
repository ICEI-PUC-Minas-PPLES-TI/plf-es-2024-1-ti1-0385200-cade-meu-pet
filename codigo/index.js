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

app.get('/Home', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/Home.html'));
});

app.get('/Dev', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/Dev.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/blog.html'));
});

app.get('/Login', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/Login.html'));
});

app.get('/Politicas', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/Politicas.html'));
});

app.get('/Termos', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/Termos.html'));
});

app.get('/cadastro_animal_perdido', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/cadastro_animal_perdido.html'));
});

app.get('/cadastro_usuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/cadastro_usuario.html'));
});

app.get('/cadastro_relato', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/cadastro_relato.html'));
});

app.get('/desaparecidos_localizados', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/desaparecidos_localizados.html'));
});

app.get('/editor_perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/editor_perfil.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/faq.html'));
});

app.get('/ferramentas', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/ferramentas.html'));
});

app.get('/meus_anuncios', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/meus_anuncios.html'));
});

app.get('/quem_somos', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/quem_somos.html'));
});

// E assim vai indo com suas outras páginas...

app.listen(3030, () => {
  console.log(`Index is running on 3030`);
});
