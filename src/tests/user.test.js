const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');
const emailService = require('../src/services/email.service');
const jwt = require('jsonwebtoken');

describe('User creation', () => {
  let adminToken;

  beforeEach(async () => {
    const admin = await User.create({
      name: 'School Admin',
      email: 'schooladmin@test.com',
      phone: '9999999999',
      role: 'admin',
      schoolId: 1,
      passwordHash: 'hash',
    });

    adminToken = jwt.sign(
      { userId: admin.id, role: 'admin', schoolId: 1 },
      process.env.JWT_SECRET
    );
  });

  it('creates user, generates password, sends email', async () => {
    const res = await request(app)
      .post('/schools/1/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'User',
        email: 'user@test.com',
        phone: '8888888888',
        roleId: 'user',
        canEditStudents: false,
      });

    expect(res.status).toBe(201);
    expect(emailService.send).toHaveBeenCalledWith(
      'user@test.com',
      '8888888888'
    );

    const user = await User.findOne({ where: { email: 'user@test.com' } });
    expect(user.passwordHash).toBeDefined();
    expect(user.passwordHash).not.toBe('8888888888');
  });

  it('prevents admin from creating user in another school', async () => {
    const res = await request(app)
      .post('/schools/2/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Hacker',
        email: 'hack@test.com',
        phone: '7777777777',
        roleId: 'user',
      });

    expect(res.status).toBe(403);
  });
});
