const mongoose = require('mongoose');
const db_bdd = "mongodb://127.0.0.1/my_first_db";

mongoose.connect(db_bdd, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log(`Established a connection to database`))
.catch(err => console.log("Something went wrong when connecting to the database", err));