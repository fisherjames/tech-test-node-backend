export interface CardSummary {
    title: string
    imageUrl: string
    url: string
}

export interface CardData {
    id: string
    title: string
    size: string
    availableSizes: Array<CardSize>
    imageUrl: string
    price: string
    pages: Array<CardPage>
}

export interface TemplateData {
    id: string
    width: number
    height: number
    imageUrl: string
}

export interface Card {
    title: string
    size: string
    availableSizes: Array<CardSize>
    imageUrl: string
    price: string
    pages: Array<CardPage>
}

export interface CardSize {
    id: string
    title: string
}

export interface CardPage {
    title: string
    width: number
    height: number
    imageUrl: string
}