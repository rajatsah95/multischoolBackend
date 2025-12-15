const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');
const jwt = require('jsonwebtoken');

describe('Student RBAC', () => {
  let readUserToken;
  let writeUserToken;

  beforeEach(async () => {
    const readUser = await User.create({
      name: 'Read User',
      email: 'read@test.com',
      phone: '111',
      role: 'user',
      schoolId: 1,
      canEditStudents: false,
      passwordHash: 'hash',
    });

    const writeUser = await User.create({
      name: 'Write User',
      email: 'write@test.com',
      phone: '222',
      role: 'user',
      schoolId: 1,
      canEditStudents: true,
      passwordHash: 'hash',
    });

    readUserToken = jwt.sign(
      { userId: readUser.id, role: 'user', schoolId: 1, canEditStudents: false },
      process.env.JWT_SECRET
    );

    writeUserToken = jwt.sign(
      { userId: writeUser.id, role: 'user', schoolId: 1, canEditStudents: true },
      process.env.JWT_SECRET
    );
  });

  it('prevents read-only user from creating student', async () => {
    const res = await request(app)
      .post('/schools/1/students')
      .set('Authorization', `Bearer ${readUserToken}`)
      .send({ name: 'Student', dob: '2010-01-01' });

    expect(res.status).toBe(403);
  });

  it('allows write user to create student', async () => {
    const res = await request(app)
      .post('/schools/1/students')
      .set('Authorization', `Bearer ${writeUserToken}`)
      .send({ name: 'Student', dob: '2010-01-01' });

    expect(res.status).toBe(201);
  });

  it('prevents cross-school student access', async () => {
    const res = await request(app)
      .get('/schools/2/students')
      .set('Authorization', `Bearer ${writeUserToken}`);

    expect(res.status).toBe(403);
  });
});
