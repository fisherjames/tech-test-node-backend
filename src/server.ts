import axios from "axios";
import * as express from "express";
import { Card, CardData, TemplateData } from "./types";
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

const getCardTemplate = async (templateId: string) => {
  return await fetchData('templates.json').then((data: Array<TemplateData>) => {
    return data.find( ({ id }) => id === templateId)
  })
}

const cardSummaryBuilder = async (card: CardData) =>  {
  let template = await getCardTemplate(card.pages[0].templateId)
  return({
      title: card.title,
      imageUrl: template.imageUrl,
      url: `cards/${card.id}`  
  })
}

const cardBuilder = async (card: CardData): Promise<Card> => {
  let template = await getCardTemplate(card.pages[0].templateId)
  return({
    title: card.title,
    // size: 'string', TODO
    availableSizes: card.sizes,
    imageUrl: template.imageUrl,
    price: `£${card.basePrice.toFixed(2)}`,
    pages: card.pages
  })
}

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  // respond with cards
  const cardsData = await fetchData('cards.json')
  const cards = await Promise.all(cardsData.map((card: CardData )=> cardSummaryBuilder(card)))
  res.status(200).send(cards) 
})

app.get('/cards/:cardId/:sizeId?', async (req, res) => {
  // respond with card by id
  const { cardId } = req.params;
  const cardsData = await fetchData('cards.json')
  const cardData = cardsData.find(card => card.id === cardId)
  const card = await cardBuilder(cardData)
  res.status(200).send(card) 
})
