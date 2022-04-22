require('dotenv/config');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const { error } = require('./middlewares/Errors');

const app = express();
app.use(express.json());

app
  .use('/user', userRoutes);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`ouvindo porta ${process.env.PORT}!`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
