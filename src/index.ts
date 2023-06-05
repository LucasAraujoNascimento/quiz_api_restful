require('dotenv').config()
import express from 'express';
import config from 'config';
import db from '../config/db'

import quizRouter from './router/quizRouter'
import userRouter from './router/userRouter'
import rankingRouter from './router/rankingRouter'

const app = express();
const port = config.get<number>('port');

app.use(express.json());

app.use('/user', userRouter);
app.use('/quiz', quizRouter);
app.use('/ranking', rankingRouter)

app.listen(port, async () => {
    await db()
    console.log(`Server running on port: ${port}`)
});

