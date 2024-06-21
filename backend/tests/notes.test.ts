import request from 'supertest';
import app from '../src/server';
import pool from '../src/db';

beforeAll(async () => {
  console.log('Setting up the database...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Database setup complete.');
});

afterAll(async () => {
  console.log('Tearing down the database...');
  await pool.query(`DROP TABLE IF EXISTS notes;`);
  await pool.end();
  console.log('Database teardown complete.');
});

describe('Notes API', () => {
  it('should create a new note', async () => {
    const response = await request(app)
      .post('/notes')
      .send({ title: 'Test Note', content: 'This is a test note' });
    expect(response.status).toBe(201); // Updated to expect 201
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Note');
  });

  it('should fetch all notes', async () => {
    const response = await request(app).get('/notes');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should fetch a single note by ID', async () => {
    const createResponse = await request(app)
      .post('/notes')
      .send({ title: 'Another Test Note', content: 'This is another test note' });
    const noteId = createResponse.body.id;
    const fetchResponse = await request(app).get(`/notes/${noteId}`);
    expect(fetchResponse.status).toBe(200);
    expect(fetchResponse.body).toHaveProperty('id', noteId);
  });

  it('should update a note by ID', async () => {
    const createResponse = await request(app)
      .post('/notes')
      .send({ title: 'Update Test Note', content: 'This is an update test note' });
    const noteId = createResponse.body.id;
    const updateResponse = await request(app)
      .put(`/notes/${noteId}`)
      .send({ title: 'Updated Test Note', content: 'This is an updated test note' });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('title', 'Updated Test Note');
  });

  it('should delete a note by ID', async () => {
    const createResponse = await request(app)
      .post('/notes')
      .send({ title: 'Delete Test Note', content: 'This is a delete test note' });
    const noteId = createResponse.body.id;
    const deleteResponse = await request(app).delete(`/notes/${noteId}`);
    expect(deleteResponse.status).toBe(200);
    const fetchResponse = await request(app).get(`/notes/${noteId}`);
    expect(fetchResponse.status).toBe(404);
  });
});