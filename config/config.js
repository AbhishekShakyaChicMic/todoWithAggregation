require('dotenv').config();
//console.log(process.env.MONGO_URI);
module.exports = {
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT||6000,
}