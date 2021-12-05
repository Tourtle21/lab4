const express = require('express');
const bodyParser = require("body-parser");

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  author: String,
  path: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/auth/login', async (req, res) => {
  try {
    let items = await User.findOne({
      username: req.body.username,
      password: req.body.password
    })
    if (!items) {
      res.sendStatus(400);
    } else {
      res.send(items);
    }
  } catch {
    console.log('IT BROKE');
  }
})

app.post('/auth/signUp', async (req, res) => {
  try {
    let items = await User.findOne({
      username: req.body.username
    })
    if (items) {
      res.sendStatus(400);
    } else {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      });
      try {
        await user.save();
        console.log("CREATING USER")
        res.send(user);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  } catch {
    console.log("COULD NOT FIND");
  }
})

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
    author: req.body.author,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.price = req.body.price;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
