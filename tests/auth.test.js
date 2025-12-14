const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

// Connect to a test database before running tests
beforeAll(async () => {
  const mongoURI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/sweetshop_test';
  await mongoose.connect(mongoURI);
});

// Clean up database after tests
afterAll(async () => {
  // Check if connection is established before dropping
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect(); // FIXED: Used disconnect() instead of close()
  }
});

describe('Auth Endpoints', () => {
  
  // Test Case: Register a new user
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  // Test Case: Prevent duplicate emails
  it('should not register user with existing email', async () => {
    // First create the user manually
    await new User({ 
        username: 'duplicate', 
        email: 'dup@example.com', 
        password: 'hashedpassword' 
    }).save();

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'duplicate_try',
        email: 'dup@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });
});
// Test Case: User Login
  it('should login user and return a token', async () => {
    // 1. Create a user manually first
    const password = 'password123';
    const salt = await require('bcryptjs').genSalt(10);
    const hashedPassword = await require('bcryptjs').hash(password, salt);
    
    await new User({ 
        username: 'loginuser', 
        email: 'login@example.com', 
        password: hashedPassword 
    }).save();

    // 2. Attempt to login with those credentials
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: password
      });

    // 3. Expect a token in return
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token'); 
  });