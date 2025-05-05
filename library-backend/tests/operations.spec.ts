import request from 'supertest';

const userEmail = 'test@gmail.com';
const bookId = '0b7baf79-c0bc-40f3-a2f3-e2441442649c';

describe('Book Operations', () => {
  it('should buy a book', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/operations/buy')
      .set('email', userEmail)
      .send({ bookId, count: "1" });

    if (res.statusCode !== 200) {
      console.error('Buy book error:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.success).toBeDefined();
  });

  it('should borrow a book', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/operations/borrow')
      .set('email', userEmail)
      .send({ bookId });

    if (res.statusCode !== 200) {
      console.error('Borrow book error:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.success).toBeDefined();
  });

  it('should return a book', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/operations/return')
      .set('email', userEmail)
      .send({ bookId });

    if (res.statusCode !== 200) {
      console.error('Return book error:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.success).toBeDefined();
  });
});
