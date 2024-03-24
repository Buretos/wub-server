const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {addNote, getNotes, removeNote, updateNote} = require('./notes.controller.js');



const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  res.render('index', { 
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async(req, res) => {
  console.log(req.body);
  await addNote(req.body.title);
  res.render('index', { 
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const updatedNote = await updateNote(id, title);
  if (updatedNote) {
    res.status(200).json(updatedNote);
  } else {
    res.status(404).send('Note not found');
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Сервер был запущен на ${port} порту`));
});