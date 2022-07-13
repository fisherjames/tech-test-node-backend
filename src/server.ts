import axios from "axios";
import * as express from "express";
export const app = express()

const getCards = async () => {
  try {
    const res = await axios.get('https://moonpig.github.io/tech-test-node-backend/cards.json')
    return res.data
  } 
  catch (error) {
    console.log('error' + error)
    return null
  }
}

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  // respond with a list of cards
})

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  // respond with card by id
  getCards().then(data => {
    const { cardId } = req.params;
    const result = data.find( ({ id }) => id === cardId)
    result === undefined ? 
      res.status(404).send(result) : 
      res.status(200).send(result)
  })
})
