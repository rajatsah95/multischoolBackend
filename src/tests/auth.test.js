const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');
const bcrypt = require('bcrypt');

describe('Auth Login', () => {
  beforeEach(async () => {
    const hash = await bcrypt.hash('1234567890', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      phone: '1234567890',
      role: 'admin',
      schoolId: 1,
      passwordHash: hash,
    });
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: '1234567890',
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects invalid password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'wrong',
      });

    expect(res.status).toBe(401);
  });
});
