const express = require('express');
const app = express();
const auth = require('./routes/auth.js')
const user = require('./routes/user.js')
const dotenv = require('dotenv')
const cors = require('cors');
const connectDb = require('./config/dbConfig.js')

dotenv.config();
connectDb();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/", auth);
app.use("/user", user)

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});