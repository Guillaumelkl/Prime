const mongoose =require('mongoose')
const DATABASE_URL = process.env.DATABASE_URL;
require('dotenv').config();


main()
    .then(() => console.log("db connected to successfully!!"))
    .catch((err)=> console.log(err));
    async function main() {
        await mongoose.connect(DATABASE_URL);
    }

    module.exports =main;
