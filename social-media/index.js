const express  = require("express");
const cors = require("cors");

const app = express();
// const server = http.createServer(app);

app.use(cors());

app.use(express.json());
const router = require("./router/analytis.route");

app.use(express.json());
app.use('/analytics', router);

app.listen(8000, () => {
  console.log("Running on port 8000");
});
