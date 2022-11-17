const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      min_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_weight: { type: DataTypes.INTEGER, allowNull: false },
      max_weight: { type: DataTypes.INTEGER, allowNull: false },
      min_lifespan: { type: DataTypes.INTEGER },
      max_lifespan: { type: DataTypes.INTEGER },
      image: { type: DataTypes.TEXT },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
