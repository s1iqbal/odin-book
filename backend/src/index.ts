require('dotenv').config()
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes'
import router from './routes/userRoutes';
import passport from 'passport';
import passportConfig from './configs/passport.config';
import session from 'express-session';
const app: Express = express();
const port = process.env.PORT || 8080;
const databaseURL = process.env.DATABASE || ' ';

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',  // replace with a strong secret key
  resave: false,
  saveUninitialized: false,
}));
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(router)
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/users', userRouter)
app.use('/auth', authRouter)


const start = async () => {
  try {
    await mongoose.connect(
      databaseURL
    ).then((Response)=>{
      console.log(`Connected to database: ${Response.connection.name}`)
    }).catch((error)=>{
      throw error;
    });
    
    app.listen(port, () => {
      console.log(`⚡️Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();