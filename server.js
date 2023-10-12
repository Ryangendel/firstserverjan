const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 65535
const path = require('path')
const db = require("./config/connection")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Dog = require("./models/Dogs")
const Joke = require("./models/Joke")

//CRUD

const MONGO_URI = process.env.MONGO_URI ||'mongodb://localhost:27017';
const client = new MongoClient(MONGO_URI);


// Database Name
// const dbName = 'myProject';
// const db = client.db(dbName);
// const collection = db.collection('documents');


// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');

//   const collection = db.collection('documents');

//   // the following code examples can be pasted here...

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
// .finally(() => client.close());



var mock_db = [{
  "categories": [],
  "created_at": "2020-01-05 13:42:30.480041",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "0ij0m13e1",
  "updated_at": "2020-01-05 13:42:30.480041",
  "url": "https://api.chucknorris.io/jokes/tExOLgwDSOKUA_W3GcxFnQ",
  "value": "Chuck Norris obtained his rugged good looks and martial art skills when he made a deal with the devil. once he received both gifts from satan Chuck Norris delivered a roundhouse kick to the devils skull and took his soul back. the devil who appreciated irony laughed at the attack. they now play golf every third tuesday of the month."
},
{
  "categories": [],
  "created_at": "2020-01-05 13:42:25.905626",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "9hqur9nasd",
  "updated_at": "2020-01-05 13:42:25.905626",
  "url": "https://api.chucknorris.io/jokes/oFjGvncORcG0tp4vN6Ej7g",
  "value": "Chuck Norris can prepare a Vegan dish out of pork, beef, chicken, eggs, milk, and butter."
},
{
  "categories": [],
  "created_at": "2020-01-05 13:42:19.324003",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "09380jasdf8",
  "updated_at": "2020-01-05 13:42:19.324003",
  "url": "https://api.chucknorris.io/jokes/dnlaai4crcslvdfwo0xvrg",
  "value": "When Chuck Norris says \"More cowbell\", he MEANS it."
},
{
  "categories": [],
  "created_at": "2020-01-05 13:42:28.664997",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "4o234nox",
  "updated_at": "2020-01-05 13:42:28.664997",
  "url": "https://api.chucknorris.io/jokes/nyrvSALVQqO-vNfebj-XqQ",
  "value": "Chuck Norris' favorite flavor of gum is Tarantula."
}
]
function checkCookie(req, res, next) {
  console.log("7777777777777")
  next()
}
//CRUD

app.use(checkCookie)

function middleware(req, res, next) {
  console.log(req)
  console.log("inside middleware")
  if (req.body.currentUser == true) {
    next()
  } else {
    res.send("make sure to login")
  }
}
console.log("--------")
console.log(__dirname)
console.log("--------")

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", 'index.html'))
})

app.get('/product/:id', function (req, res) {
  var matchedData = {}
  for (let i = 0; i < mock_db.length; i++) {
    if (req.params.id == mock_db[i].id) {
      matchedData = mock_db[i]
    }
  }
  res.json(matchedData)
})


app.post('/createjoke', function (req, res) {
  console.log("&&&&&&&&&")
  console.log(req)
  console.log("&&&&&&&&&")

  const newJoke = new Joke(req.body)
  console.log("----------------------")
  console.log(newJoke)
  console.log("----------------------")
  newJoke.save()
  if(newJoke){
    res.json(newJoke)
  }else{
    res.json({message:"there is an issue on your server"})
  }
})

app.put('/product', function (req, res) {
  console.log(req.body)
  res.send('Hello World PUT')
})

app.delete('/product', function (req, res) {
  console.log(req.body)
  res.send('Hello World DELETE')
})

app.get('/product', async function (request, response) {
  const newDog = new Dog({name:"Hunter", age:4, breed:"pit", pound:"Thornton"})
  newDog.save()
  if(newDog){
    response.sendStatus(200).json(newDog)
  }else{
    response.status(500).json({message:"there is an issue on your server"})
  }
  // const insertResult = await collection.insertOne({ name: "Runa", age: 2, breed: "pit", pound: "Westminster", apple: "Banana" });
  // console.log('Inserted documents =>', insertResult);
  // console.log("get route")
  // response.json(mock_db[1])
})

db.once("open", ()=>{
  app.listen(PORT, function () {
    console.log("listening on port 65535")
  })
})