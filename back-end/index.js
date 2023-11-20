const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

app.listen(port);

console.log(`Api rodando na porta ${port}`);

module.exports = app;
