const express = require('express');
const app = express();
app.use(express.static(__dirname + "/client/dist/"));
console.log("Dir " + __dirname);



app.get(/.*/,(req, res)=>{
  res.sendFile(__dirname + "/client/dist/index.html")
})

const port = 4004;
app.listen(port);
console.log('server started '+ port);