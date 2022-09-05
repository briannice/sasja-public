export type BaseModel = {
  id: string
  created: string
  updated: string
}

export type EventModel = BaseModel & {
  name: string
  content: string
  time: string
  location: string
  address: string
  public: boolean
}

export type NewsModel = BaseModel & {
  title: string
  time: string
  content: string
  tag: string
  public: boolean
  pinned: boolean
}

export type TeamModel = BaseModel & {
  name: string
  uid: string
  youth: boolean
  competitions: {
    name: string
    serieId: number
  }[]
}
