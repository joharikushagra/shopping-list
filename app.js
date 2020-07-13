const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const items = require('./routes/apis/Items');
const path = require('path');

//bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("mongo connected..."))
  .catch((err) => console.log(err));

  //Use routes
app.use('/api/items',items);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('frontend/build'));

  app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
  })
}

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});
