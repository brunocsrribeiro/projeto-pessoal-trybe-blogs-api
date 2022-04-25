require('dotenv/config');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const loginRoutes = require('./routes/login.routes');
const categoryRouter = require('./routes/category.routes');
const blogPostRouter = require('./routes/blogPosts.routes');
const { error } = require('./middlewares/Errors');

const app = express();
app.use(express.json());

app
  .use('/user', userRoutes)
  .use('/login', loginRoutes)
  .use('/categories', categoryRouter)
  .use('/post', blogPostRouter);

app.use(error);

app.listen(process.env.PORT || 3000, () => {
  console.log(`ouvindo porta ${process.env.PORT || 3000}!`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
