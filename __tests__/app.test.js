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

// GET /api/treasures
// Create an endpoint that responds with all treasures, including the shop name and details, to allow Mitch to view all the treasures currently available.

// each treasure should have the following keys:
// treasure_id
// treasure_name
// colour
// age
// cost_at_auction
// shop_name
// default sort criteria: age
// default sort order: ascending
// /api/treasures, first result should be the youngest (default)

{
  treasures: [
    {
      // treasure_id
      // treasure_name
      // colour
      // age
      // cost_at_auction
      // shop_name
    },
  ];
}

describe('GET: /api/obiiscoolerthantufty', () => {
  test.todo('test what happens for an undefined endpoint', () => {});
});

describe('GET: /api/treasures', () => {
  test('200: responds with all treasures, including the shop name and details', () => {
    return request(app)
      .get('/api/treasures')
      .expect(200)
      .then(({ body }) => {
        console.log(body, '<<<<<<< body');
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
  test('200: responds with treasures ordered according to the order query', () => {
    // /api/treasures?sort_by=age
    // I don't know if or when you will need this!!!
  });
});

describe('GET: /api/treasures/:treasure_id', () => {
  test.todo('test the happy path with a parameter', () => {
    // test logic goes here!
  });
  test.todo('id is not a number', () => {
    // send a request where the id is not a number
  });
  test.todo('request a resource that doesnt exist', () => {
    // maybe request treasure 99
  });
});
