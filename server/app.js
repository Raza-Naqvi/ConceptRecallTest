const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const server = require("http").createServer(app);

dotenv.config();

const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send("Hello World"));

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    server.listen(port);
    console.log(`server is running at port http://localhost:${port}`);
    console.log(`connected with mongoose`);
}).catch((err) => console.log(err));

app.use("/auth", require("./Routes/routes"));