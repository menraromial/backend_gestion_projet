require('dotenv').config();
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import cors from 'cors';
import morgan from 'morgan';
//import cookieParser from 'cookie-parser';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import AppError from './utils/appError';
//const bodyParser = require('body-parser');
//cors = require('cors')
import TypeProjetRouter from './routes/typeprojet.route'
import ProjetRouter from './routes/projet.route'
import ObjectifGlobalRouter from './routes/objectifglobal.route'
import HypotheseRouter from './objectif/routes/hypothese.route'
import IndicateurRouter from './objectif/routes/indicateur.route'
import ObjectifglobalRouter from './objectif/routes/objectifglobal.route'
import ObjectifspecifiqueRouter from './objectif/routes/objectifspecifique.route'


validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
    // 1.Body Parser
    app.use(express.json({ limit: '10kb' }));
      // 2. Cors
    app.use(
        cors({
          origin: ['http://localhost:3001','http://localhost:3000'],
          credentials:true,            //access-control-allow-credentials:true
          optionSuccessStatus:200
        })
      );

    app.use((req : Request,res :Response,next : NextFunction)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept,Content-Type,Authorization');
    
    return next();
})

      // 3. Logger
      if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
    app.use(require('body-parser').urlencoded({ extended: false }));
    app.use(require('body-parser').json());

    // Testing
    app.get('/api/healthchecker', async (_, res: Response) => {
      res.status(200).json({
        status: 'success',
        message:"succes",
      });
    });

    // Register API routes
    app.use("/api/v1/typeprojet", TypeProjetRouter);
    app.use("/api/v1/projet", ProjetRouter);
    app.use("/api/v1/objectifglobal",ObjectifGlobalRouter);

    app.use("/api/v1/hypothese", HypotheseRouter);
    app.use("/api/v1/indicateur", IndicateurRouter);
    app.use("/api/v1/objectifglobal", ObjectifglobalRouter);
    app.use("/api/v1/objectifspecifique", ObjectifspecifiqueRouter);
    
    // UNHANDLED ROUTES
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
      err.status = err.status || 'error';
      err.statusCode = err.statusCode || 500;

      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    });
    //const port = config.get<number>('port');
    const port = config.get<number>('port');
    app.listen(port, () => {
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

