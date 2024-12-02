const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nc1ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log("conectado ao banco de dados mongodb");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectToDatabase;
