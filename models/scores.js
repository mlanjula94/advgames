module.exports = function(sequelize, DataTypes) {
  var Scores = sequelize.define("Scores", {
    game: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  });

  Scores.associate = function(models) {
    // We're saying that a Scores should belong to an Users
    // A Scores can't be created without an Users due to the foreign key constraint
    Scores.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Scores;
};
