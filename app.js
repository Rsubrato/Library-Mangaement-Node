const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const cookieParser = require('cookie-parser');
const Book=require('./models/books');
const morgan = require('morgan');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI="mongodb+srv://subrato1:asdfghjkl@sample.rih5xc5.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result)=>{
  app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
  })
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);


app.get('*', checkUser);
app.get('/',(req,res)=>{
  Book.find()
  .then((result)=>{
      res.render('home',{title:'List Of Books', books:result})
  })
  .catch((err)=>{
      console.log(err);
  })
});

app.use(authRoutes);
app.use('/admin',adminRoutes);
app.use('/students',studentRoutes);
app.use('/lecturer',lecturerRoutes);
