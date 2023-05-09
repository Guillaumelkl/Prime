const express = require('express');
const cors = require('cors');
const unprotectedRoutes =require('./Routes/openRoutes')
const protectedRoutes = require("./Routes/protectedRoutes");

require("./Database/connection")
const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", unprotectedRoutes);
app.use("/auth", protectedRoutes);


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});