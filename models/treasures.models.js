const db = require('../db/connection');

exports.selectTreasures = () => {
	return db
		.query(
			`
    SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name FROM treasures
    JOIN shops  ON treasures.shop_id = shops.shop_id
    ORDER BY age ASC
    ;`
		)
		.then(({ rows }) => {
			return rows;
		});
};
exports.selectTreasuresById =(treasure_id)=>{

	return db.query(`SELECT * FROM treasures WHERE treasure_id = $1`, [treasure_id] )
	.then(({rows})=>{
		return rows[0]

	})
	console.log("invoke model")
}
