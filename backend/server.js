const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');


require('dotenv').config();

const app=express();
const port=process.env.port || 5000;

app.use(cors());
app.use(bodyparser.json());

const uri=process.env.ATLAS_URI;
const options={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  //useFindAndModify: false,
  //autoIndex: false, // Don't build indexes
  //poolSize: 10, // Maintain up to 10 socket connections
  //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  //family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(uri, options);

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connected successfully");
});
/*connection.close(()=>{
    console.log("connection closing with mongoose db...");
});*/

const usersRouter=require('./routers/users');
const exerciseRouter=require('./routers/exercises');

app.use('/exercises',exerciseRouter);
app.use('/users',usersRouter);



app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})

