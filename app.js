const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);


// const errorController = require('./controllers/error');

const User = require('./models/user');

const URL = "mongodb+srv://dev-binni:Binnidev123@cluster0.th46meb.mongodb.net/shop_mongoose?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

const store = new MongoDBStore({
  uri: URL,
  collection: 'sessions',

});



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'IamPankajBinwal',
  resave: false,
  saveUninitialized: false,
  store: store
  // cookie: {
  //   maxAge:
  // }
}))
app.use((req, res, next) => {

  User.findById('6649ea3df1aa32a4e58db468')
    .then(user => {

      //console.log(user);

      req.user = user
      next();
    })
    .catch(err => console.log(err));
  //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

// app.use(errorController.get404);
//const URL = "mongodb+srv://binni-dev:Binnidev123@cluster0.luvofic.mongodb.net/"

mongoose.connect(URL).then(res => {
  console.log("connected to database");
  User.findOne().then(user => {
    if (!user) {
      const user = new User(
        {
          name: "elon musk",
          email: "elon@musk.com",
          cart: {
            items: []
          }
        })
      user.save()
    }
  })

  app.listen(3000, () => {
    console.log('App is running on port 3000');

  })
}).catch(err => {
  console.log(err);

})
