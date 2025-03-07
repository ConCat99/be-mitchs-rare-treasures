const db = require('../db/connection');
const seed = require('../db/seed');
const testData = require('../db/data/test-data/index');
const app = require('../app');
const request = require('supertest');

beforeEach(() => {
	return seed(testData);
});

afterAll(() => {
	return db.end();
});

describe('GET: /api/treasures', () => {
	test('200: responds with all treasures, including the shop name and details', () => {
		return request(app)
			.get('/api/treasures')
			.expect(200)
			.then(({ body }) => {
				expect(body.treasures.length).toBe(26);
				body.treasures.forEach(
					({
						treasure_id,
						treasure_name,
						colour,
						age,
						cost_at_auction,
						shop_name,
					}) => {
						expect(typeof treasure_id).toBe('number');
						expect(typeof treasure_name).toBe('string');
						expect(typeof colour).toBe('string');
						expect(typeof age).toBe('number');
						expect(typeof cost_at_auction).toBe('number');
						expect(typeof shop_name).toBe('string');
					}
				);
			});
	});
	test('200: responds with treasures ordered by ascending', () => {
		return request(app)
			.get('/api/treasures?sort_by=age')
			.expect(200)
			.then(({ body }) => {
				const treasuresCopy = [...body.treasures].sort((a, b) => a.age - b.age);
				expect(body.treasures).toEqual(treasuresCopy);
			});
	});
});

describe('GET: /api/treasures/:treasure_id', () => {
	test('200:  Responds with the correct individual treasure of that ID .', () => {
		return request(app)
			.get('/api/treasures/3')
			.expect(200)
			.then(({ body }) => {
				const treasure = body.treasure;
				expect(treasure.treasure_id).toBe(3);
			});
	});
});

describe.only('GET: /api/treasures?sort_by', () => {
	test('200: Respond with a list of treasures cheapest first and therefore in the ascending order ', () => {
		return request(app)
			.get('/api/treasures?sort_by=cost_at_auction')
			.expect(200)
			.then(({ body }) => {
				expect(body.treasures.length).toBe(26);
				const treasuresCopy = [...body.treasures].sort(
					(a, b) => a.cost_at_auction - b.cost_at_auction
				);
				expect(body.treasures).toEqual(treasuresCopy);
			});
	});
	test('400: Respond with error when the sort by criteria is not permitted', () => {
		return request(app)
			.get('/api/treasures?sort_by=sausage')
			.expect(400)
			.then(({ body }) => {
				expect(body.message).toBe('Invalid sort_by input ');
			});
	});
});

describe('Error Handling block', () => {
	test('400: Responds with bad request message if request parameter is invalid', () => {
		return request(app)
			.get('/api/treasures/sausage')
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe('Bad Request');
			});
	});

	xtest('404: Responds with not found error if endpoint does not exist', () => {
		return request(app)
			.get('/api/treasures/99')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('Not Found');
			});
	});
});
