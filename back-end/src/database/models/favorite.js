module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      userId: DataTypes.INTEGER,
      favorite: DataTypes.JSON,
    },
    {
      timestamps: false,
      tableName: "favorites",
    }
  );

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Favorite;
};
