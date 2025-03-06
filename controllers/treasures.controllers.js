const { selectTreasures } = require('../models/treasures.models');

exports.getTreasures = (req, res, next) => {
  selectTreasures()
    .then((treasures) => {
      res.status(200).send({ treasures });
    })
    .catch((err) => {
      next(err);
    });
};
