require('dotenv').config();
import express, { Response } from 'express';
//import config from 'config';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
//const bodyParser = require('body-parser');
//cors = require('cors')

validateEnv();

const prisma = new PrismaClient();
const app = express();

app.use(require('cors')());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

async function bootstrap() {
  // Testing
  app.get('/api/healthchecker', async (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message:"succes",
    });
  });

  //const port = config.get<number>('port');
  const port = 3000
  app.listen(3000, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

