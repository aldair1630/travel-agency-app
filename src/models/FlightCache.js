const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const FlightCache = sequelize.define("FlightCache", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    dep_iata: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arr_iata: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });

  return FlightCache;
};