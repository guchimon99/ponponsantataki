import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebase as FirebaseConfig } from './config'

firebase.initializeApp(FirebaseConfig)

const firestore = firebase.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

export const authRef = firebase.auth()
export const usersRef = firestore.collection('users')

export const snapshotToObj = (snapshot) => {
  var obj = {}
  snapshot.forEach((doc) => obj[doc.id] = doc.data())
  return obj
}
