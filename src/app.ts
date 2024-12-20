import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.get('/', (req, res) => {
  res.send('Welcome to Blog Project Server!');
});

// application routes
app.use('/api', router);
// global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
