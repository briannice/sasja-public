import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
} from 'firebase/firestore'

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
