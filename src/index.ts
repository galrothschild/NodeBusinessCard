import express, { Request, Response } from 'express';
import router from './router/router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
    });