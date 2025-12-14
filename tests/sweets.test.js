const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Sweet = require('../models/Sweet');

// Setup and Teardown
beforeAll(async () => {
  const mongoURI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/sweetshop_test_sweets';
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
});

describe('Sweets API', () => {
  let token;

  // Login a user before running tests to get a token
  beforeEach(async () => {
    // Clear data
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create a user
    const user = new User({ 
        username: 'admin', 
        email: 'admin@test.com', 
        password: 'password', 
        role: 'admin' 
    });
    await user.save();
    
    // Generate token manually for test
    const jwt = require('jsonwebtoken');
    token = jwt.sign({ user: { id: user.id, role: user.role } }, 'secret', { expiresIn: '1h' });
  });

  // Test 1: POST /api/sweets (Add a sweet)
  it('should add a new sweet if authorized', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('x-auth-token', token)
      .send({
        name: 'Chocolate Fudge',
        category: 'Chocolate',
        price: 5.99,
        quantity: 20
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Chocolate Fudge');
  });

  // Test 2: Block unauthorized access
  it('should deny access without token', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .send({
        name: 'Secret Candy',
        category: 'Hidden',
        price: 100,
        quantity: 1
      });

    expect(res.statusCode).toEqual(401);
  });

  // Test 3: GET /api/sweets (Get all sweets)
  it('should fetch all sweets', async () => {
    // Add a sweet first
    const sweet = new Sweet({
      name: 'Gummy Bears',
      category: 'Gummies',
      price: 2.50,
      quantity: 50
    });
    await sweet.save();

    const res = await request(app)
      .get('/api/sweets')
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test 4: DELETE /api/sweets/:id (Admin only)
  it('should delete a sweet if admin', async () => {
    // 1. Create a sweet to delete
    const sweet = new Sweet({ name: 'To Delete', category: 'Test', price: 1, quantity: 1 });
    await sweet.save();

    // 2. Send DELETE request
    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Sweet removed');
  });

  // Test 5: Purchase Sweet
  it('should purchase a sweet and decrease quantity', async () => {
    // 1. Create sweet with quantity 10
    const sweet = new Sweet({ name: 'Lollipop', category: 'Hard Candy', price: 0.50, quantity: 10 });
    await sweet.save();

    // 2. Purchase it
    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set('x-auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.quantity).toEqual(9); // 10 - 1 = 9
  });

  // Test 6: Restock Sweet (Admin)
  it('should restock sweet if admin', async () => {
    // 1. Create sweet with quantity 5
    const sweet = new Sweet({ name: 'KitKat', category: 'Choco', price: 1.00, quantity: 5 });
    await sweet.save();

    // 2. Restock by adding 50
    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/restock`)
      .set('x-auth-token', token)
      .send({ quantity: 50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.quantity).toEqual(55); // 5 + 50 = 55
  });

});