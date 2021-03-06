const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require('./routes/auth.routes')(app);
require('./routes/car.routes')(app);
app.use(cors());
const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
  }

let corsOptions = {
  origin: "http://localhost:4200"
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});