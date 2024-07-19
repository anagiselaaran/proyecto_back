// Server creation and configuration
const http = require("http");
const app = require("./src/app");

// Config .env
require("dotenv").config();

// DB connection
require("./src/config/db");

//config base de datos
require('./src/config/db');

// Server creation
const server = http.createServer(app);

// config base de datos
require('./src/config/db');

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on("listening", () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on("error", error => {
    console.log(error);
});
