import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  getDoc,
  getDocs,
} from 'firebase/firestore'

import { EventModel, MatchReportModel, NewsModel, TimeLine } from '@/types/models'

type Document = QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>

type Collection = QuerySnapshot<DocumentData>

export const documentToModel = <M>(document: Document) => {
  const result: any = { id: document.id, ...document.data() }

  const timeKeys = [
    'created',
    'updated',
    'date',
    'dateTime',
    'time',
    'moment',
    'registration',
    'birthday',
  ]

  Object.entries(result).forEach(([key, value]) => {
    if (timeKeys.includes(key)) {
      const ts = value as Timestamp
      result[key] = ts.toDate().toISOString()
    }
  })

  return result as unknown as M
}

export const collectionToModels = <M>(collection: Collection) =>
  collection.docs.map((doc) => documentToModel<M>(doc))

export const queryToModels = async <M>(query: Query) => collectionToModels<M>(await getDocs(query))

export const docRefToModel = async <M>(docRef: DocumentReference<DocumentData>) =>
  documentToModel<M>(await getDoc(docRef))

export const createTimeLine = (
  events: EventModel[],
  pinnedNews: NewsModel[],
  currentNews: NewsModel[],
  matchReports: MatchReportModel[]
) => {
  const staticTimeLine: TimeLine = []
  events.forEach((event) => staticTimeLine.push({ name: 'event', data: event }))
  pinnedNews.forEach((news) => staticTimeLine.push({ name: 'news', data: news }))
  const dynamicTimeLine: TimeLine = []

  currentNews.forEach((news) => dynamicTimeLine.push({ name: 'news', data: news }))
  matchReports.forEach((matchReport) =>
    dynamicTimeLine.push({ name: 'matchreport', data: matchReport })
  )
  dynamicTimeLine.sort(
    (t1, t2) => new Date(t2.data.time).getTime() - new Date(t1.data.time).getTime()
  )

  return [...staticTimeLine, ...dynamicTimeLine]
}
