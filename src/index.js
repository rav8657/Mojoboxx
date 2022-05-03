import express from 'express';
import route  from './routes/route.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.use('/', route);

mongoose.connect("mongodb+srv://sourav:project123@cluster0.hciw4.mongodb.net/Mojoboxx")
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err))


app.listen(3000, function(){
    console.log('Express is running on port 3000');
})