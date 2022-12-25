import express from 'express';
import logger from './middlewares/logger.middleware';
import router from './routes/index.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
