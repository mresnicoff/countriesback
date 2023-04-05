const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      difficulty: { type: DataTypes.INTEGER, allowNull: false, max: 5, min: 1 },
      duration: { type: DataTypes.INTEGER, allowNull: true },
      season: {
        type: DataTypes.ENUM("Summer", "Winter", "Spring", "Autumn"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
