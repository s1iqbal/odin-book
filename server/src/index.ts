require('dotenv').config()
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes'
import router from './routes/userRoutes';
import passport from 'passport';
import passportConfig from './configs/passport.config';
import session from 'express-session';
import bodyParser from 'body-parser';
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 8080;
const databaseURL = process.env.DATABASE || ' ';
const secret = process.env.SESSION_SECRET || 'secretcode'

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(session({
  secret,  // replace with a strong secret key
  resave: true,
  saveUninitialized: true,
}));
app.use(router)
app.use(express.json())
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);


// Routes
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