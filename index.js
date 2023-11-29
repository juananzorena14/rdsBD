const express = require ("express")
const Server = require ("./models/server")
require ("dotenv").config();


//const app = express();
const server = new Server();

server.listen();
server.middlewares();

//app.listen(3000);