const express = require('express');
const cors = require('cors');

require("./Database/connection")
const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});