const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const apiKeyMiddleware = require("./middleware/apiKey.js");

var corsOption = {
    origin : 'localhost:8081'
}

const app = express();

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(apiKeyMiddleware);

app.get("/", function(response){
    response.json({ message : "Tersambung" });
});

require('./routes/tesRouterRouter.js')(app);
require('./routes/requestUserRouter.js')(app);
require('./routes/authRouter.js')(app);

const db = require("./models");
const portApi = process.env.port || 7474;

app.listen(portApi, ()=>{
    console.log(`Server berjalan pada ${portApi}`);
})