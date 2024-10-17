import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

const notificationsCollection = collection(db, 'notifications')

const getNotifications = async (userId, setNotifications) => {
  onSnapshot(notificationsCollection, response => {
    setNotifications(
      response.docs
        .map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        .filter(doc => doc.userId === userId)
    )
  })
}

const readNotifications = async id => {
  const docToUpdate = doc(notificationsCollection, id)
  updateDoc(docToUpdate, { isRead: true })
}

const delNotifications = async id => {
  deleteDoc(doc(notificationsCollection, id))
}

export { getNotifications, readNotifications, delNotifications }
