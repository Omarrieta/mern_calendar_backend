import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.js';
import { dbConnection } from './database/config.js';
import cors from 'cors';
import routerEvents from './routes/events.js';

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', routerAuth);
app.use('/api/events', routerEvents);

app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});