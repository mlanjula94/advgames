var db = require("../models");

module.exports = function (app) {
  app.get("/api/wm/scores", function (req, res) {
    
    db.Scores
      .findAll({
        limit: 5,
        include:[db.User],
        where: {
          UserId: req.user.id,
          game: 'Wack A Mole'
        },
        // Add order conditions here....
        order: [
          ['score', 'DESC'],
        ]
      })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });


 
}