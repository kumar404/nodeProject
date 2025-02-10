const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const Blog = require('./models/blog');
const http = require('http');
const blogRoutes = require('./routes/blogRoutes')

const PORT = 3000;

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://satya:ZOApS80aXALgFHdK@cluster2.bvdsm.mongodb.net/SATYA?retryWrites=true&w=majority&appName=Cluster2';

mongoose.connect(dbURI) // ✅ No need for useNewUrlParser and useUnifiedTopology
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.error("Connection failed", err));

// register view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use('/',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, ()=>{
  console.log('server is running on port : 3000.');
})