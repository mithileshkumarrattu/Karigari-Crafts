import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"
import { getDbInstance } from "./firebase"

// Function to sanitize data for Firestore
function sanitizeForFirestore(input: any): any {
  if (input === undefined) return null
  if (input === null) return null
  if (input instanceof Date) return Timestamp.fromDate(input)
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeForFirestore(item)).filter((v) => v !== undefined)
  }
  if (typeof input === "object") {
    const out: any = {}
    for (const [k, v] of Object.entries(input)) {
      if (v === undefined) continue
      out[k] = sanitizeForFirestore(v)
    }
    return out
  }
  return input
}

// Generic Firestore service class
class FirebaseService {
  async create<T>(collectionName: string, data: Omit<T, "id">): Promise<string> {
    if (typeof window === "undefined") {
      throw new Error("Firebase operations not available on server-side")
    }
    try {
      const db = getDbInstance()
      const sanitized = sanitizeForFirestore(data)
      const docRef = await addDoc(collection(db, collectionName), {
        ...sanitized,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
      return docRef.id
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error)
      throw error
    }
  }

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    if (typeof window === "undefined") {
      return null
    }

    try {
      const db = getDbInstance()
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T
      }
      return null
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error)
      return null
    }
  }

  async getAll<T>(collectionName: string, orderByField?: string): Promise<T[]> {
    if (typeof window === "undefined") {
      return []
    }

    try {
      const db = getDbInstance()
      const q = orderByField
        ? query(collection(db, collectionName), orderBy(orderByField))
        : collection(db, collectionName)

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[]
    } catch (error) {
      console.error(`Error getting all documents from ${collectionName}:`, error)
      return []
    }
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    if (typeof window === "undefined") {
      throw new Error("Firebase operations not available on server-side")
    }
    try {
      const db = getDbInstance()
      const sanitized = sanitizeForFirestore(data)
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...sanitized,
        updatedAt: Timestamp.now(),
      })
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error)
      throw error
    }
  }

  async getWhere<T>(
    collectionName: string,
    field: string,
    operator: any,
    value: any,
    orderByField?: string,
    limitCount?: number,
  ): Promise<T[]> {
    if (typeof window === "undefined") {
      return []
    }

    try {
      const db = getDbInstance()
      let q = query(collection(db, collectionName), where(field, operator, value))

      if (orderByField) {
        q = query(q, orderBy(orderByField))
      }

      if (limitCount) {
        q = query(q, limit(limitCount))
      }

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[]
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error)
      return []
    }
  }
}

export const firestoreService = new FirebaseService()
