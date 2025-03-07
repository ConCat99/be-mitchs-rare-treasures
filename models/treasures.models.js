const db = require('../db/connection');

exports.selectTreasures = (sort_by = 'age') => {
	const permittedInput = ['cost_at_auction', 'age', 'treasure_name'];
	let sort_byStr =
		'SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name FROM treasures  JOIN shops  ON treasures.shop_id = shops.shop_id';

	const sortCategories = [];
	if (!permittedInput.includes(sort_by)) {
		return Promise.reject({ status: 404, msg: 'Invalid Input' });
	}
	if (sort_by) {
		sortCategories.push(sort_by);
		sort_byStr += `WHERE sort_by = $1`;
	}

	return db
		.query(`ORDER BY ${sort_by} ASC`, sortCategories)
		.then(({ rows }) => {
			return rows;
		});
};
exports.selectTreasuresById = (treasure_id) => {
	return db
		.query(`SELECT * FROM treasures WHERE treasure_id = $1`, [treasure_id])
		.then(({ rows }) => {
			return rows[0];
		});
};
