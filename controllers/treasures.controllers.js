const { selectTreasures, selectTreasuresById } = require('../models/treasures.models');

exports.getTreasures = (req, res, next) => {
  selectTreasures()
    .then((treasures) => {
      res.status(200).send({ treasures });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getTreasuresById = (req, res, next)=>{
  console.log((req.params.id))
  const id = req.params.id
  selectTreasuresById(id)
  .then((treasure)=>{
    res.status(200).send({treasure})
  })
  .catch((err) => {
    next(err);
  });
  console.log(" i am been invoke <--- controller")

}
