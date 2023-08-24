const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 65535
const path = require('path')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//CRUD
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
  "id":"4o234nox",
  "updated_at": "2020-01-05 13:42:28.664997",
  "url": "https://api.chucknorris.io/jokes/nyrvSALVQqO-vNfebj-XqQ",
  "value": "Chuck Norris' favorite flavor of gum is Tarantula."
}
]
function checkCookie(req, res, next){
  console.log("7777777777777")
  next()
}

app.use(checkCookie)

function middleware(req, res, next){
  console.log(req)
  console.log("inside middleware")
  if (req.body.currentUser==true){
  next()
  }else{
    res.send("make sure to login")
  }
}
console.log("--------")
console.log(__dirname)
console.log("--------")

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/product/:id', function (req, res) {
  var matchedData = {}
  for (let i = 0; i < mock_db.length; i++) {
   if(req.params.id == mock_db[i].id){
    matchedData = mock_db[i]
   }
  }
  res.json(matchedData)
})


app.post('/product',middleware, function (req, res) {
 
  res.send('Hello World from POST')
})

app.put('/product', middleware, function (req, res) {
  res.send('Hello World PUT')
})

app.delete('/product', middleware, function (req, res) {
  res.send('Hello World DELETE')
})

app.get('/product', function (request, response) {
  console.log("get route")
  response.json(mock_db[1])
})

app.listen(PORT, function () {
  console.log("listening on port 65535")
})