import * as request from 'supertest';
import { app } from '../server';

describe('card endpoint', () => {
  test('returns matching card title', async () => {
    const response = await request(app).get('/cards/card001')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      title: 'card 1 title',
    }))
  })
  
  test('returns data that matches "Card" type', async () => {
    const response = await request(app).get('/cards/card001')
    expect(response.body).toEqual(expect.objectContaining({
      title: expect.any(String),
      availableSizes: expect.any(Array),
      imageUrl: expect.any(String),
      price: expect.any(String),
      pages: expect.any(Array)
    }))
  })
})

describe('cards endpoint', () => {
  test('returns data that matches "CardSummary" type', async () => {
    const response = await request(app).get('/cards')
    expect(response.body[0]).toEqual(expect.objectContaining({
      title: expect.any(String),
      imageUrl: expect.any(String),
      url: expect.any(String)
    }))
  })
})