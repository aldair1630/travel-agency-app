require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/travelagency`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Destination, Reservation } = sequelize.models;

// Relaciones
User.belongsToMany(Destination, { through: Reservation, foreignKey: "userId" });
Destination.belongsToMany(User, { through: Reservation, foreignKey: "destinationId" });

Reservation.belongsTo(User, { foreignKey: "userId" });
Reservation.belongsTo(Destination, { foreignKey: "destinationId" });
User.hasMany(Reservation, { foreignKey: "userId" });
Destination.hasMany(Reservation, { foreignKey: "destinationId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
