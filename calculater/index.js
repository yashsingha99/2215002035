const express  = require("express");
const cors = require("cors");

const app = express();
// const server = http.createServer(app);

app.use(cors());

app.use(express.json());
const calculater = require("./router/number.route.js");

app.use(express.json());
app.use('/api', calculater);

app.listen(8000, () => {
  console.log("Running on port 8000");
});
