import axios from "axios";
import * as express from "express";
import { CardData, CardSummary, TemplateData } from "./types";
export const app = express()

const fetchData = async (URI) => {
  try {
    const res = await axios.get(`https://moonpig.github.io/tech-test-node-backend/${URI}`)
    return res.data
  } 
  catch (error) {
    console.log('error' + error)
    return null
  }
}

const getCardTemplate = async (cardId) => {
  const cardNumber = cardId.slice(4)
  const templateId = `template${cardNumber}`
  return fetchData('templates.json').then((data: Array<TemplateData>) => {
    return data.find( ({ id }) => id === templateId)
  })
}

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  // respond with a list of cards
})

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  // respond with card by id
  fetchData('cards.json').then(async (data: Array<CardData>) => {
    const { cardId } = req.params;
    const template = await getCardTemplate(cardId);
    const result = data.find( ({ id }) => id === cardId)
    const card: CardSummary = {
      title: result.title,
      imageUrl: template.imageUrl,
      url: `cards/${cardId}`
    }
    result === undefined ? 
      res.status(404).send(null) : 
      res.status(200).send(card)
  })
})
