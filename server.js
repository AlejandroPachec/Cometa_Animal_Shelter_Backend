const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const { PORT } = require('./config');

const teamRouter = require('./routes/teamRouter');
const petsRouter = require('./routes/petsRouter');
// const testimoniesRouter = require('./routes/testimoniesRouter');

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(fileUpload());

app.use('/team', teamRouter);
app.use('/pets', petsRouter);
// app.use('/testimonies', testimoniesRouter);

app.use((err, req, res, next) => {
  console.error(err);

  const errorCode = err.statusCode ?? 500;

  res.status(errorCode).send({
    error: err.message
  });
});

app.use((req, res) => {
  res.status(404).send({
    message: '¡No encontrado!'
  });
});

app.listen(5002, () => {
  console.log(`Server listening at http://localhost:${PORT}...`);
});
