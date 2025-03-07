const {
	selectTreasures,
	selectTreasuresById,
} = require('../models/treasures.models');

exports.getTreasures = (req, res, next) => {
	const { sort_by } = req.query;
	selectTreasures(sort_by)
		.then((treasures) => {
			res.status(200).send({ treasures });
		})
		.catch((err) => {
			next(err);
		});
};
exports.getTreasuresById = (req, res, next) => {
	const id = req.params.id;
	selectTreasuresById(id)
		.then((treasure) => {
			res.status(200).send({ treasure });
		})
		.catch((err) => {
			next(err);
		});
};
