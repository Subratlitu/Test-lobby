const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://dev:gopaisa69@139.59.95.136:19501/gopaisa", {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 poolSize: 100
});
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("open", () => {
 console.log("mongodb connected");
});

db.on("error", (err) => {
 console.log("error in mongo connection", err);
});

module.exports = db;
