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

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
    pingInterval: 10000,
    pingTimeout: 60000,
    transports: ['websocket'],
    origins: '*:*',
    transports: ['polling'],
});

io.on("connection", (socket) => {
    console.log("connected to socket io");
    //for joining user personal socket room
    socket.on("setup", userId => {
        console.log("back", userId);
        try {
            socket.join(userId);
            socket.emit("connected");
        } catch (error) {
            console.error("Error joining room:", error);
        };
    });

    socket.on("joinChat", room => {
        try {
            socket.join(room);
            console.log("joined room", room);
        } catch (error) {
            console.error("Error joining chat room:", error);
        };
    });

    socket.on("newMessage", recievedMsg => {
        try {
            socket.to(recievedMsg.chatId).emit("msgReceived", recievedMsg);
            console.log("here--------------------", recievedMsg);
        } catch (error) {
            console.error("Error sending message:", error);
        };
    });

    socket.on("disconnect", async () => {
        console.log("user disconnected");
    });
});

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
app.use("/myChat", require("./Routes/MyChats"));