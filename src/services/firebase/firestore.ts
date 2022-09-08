import {
  DocumentData,
  DocumentSnapshot,
  getDocs,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
} from 'firebase/firestore'

type Document = QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>

export const documentToModel = <M>(document: Document) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type Collection = QuerySnapshot<DocumentData>

export const collectionToModels = <M>(collection: Collection) =>
  collection.docs.map((doc) => documentToModel<M>(doc))

export const queryToModels = async <M>(query: Query) => collectionToModels<M>(await getDocs(query))
