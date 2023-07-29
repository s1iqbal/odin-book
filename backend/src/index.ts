require('dotenv').config()
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
const app: Express = express();
const port = process.env.PORT || 8080;
const databaseURL = process.env.DATABASE || ' ';

app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
require('./routes/userRoutes')(app);


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