import { defineStore } from 'pinia'
import { auth, db } from '@/services/firebase'
import { setDoc, doc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const { Email: email, Password: password, Name: name, Age: age, Country: country } = values
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const userRef = doc(db, 'users', userCred.user.uid)
      await setDoc(userRef, { email, name, age, country })

      await updateProfile(userCred.user, {
        displayName: name
      })
    },
    async login(values) {
      const { Email: email, Password: password } = values
      await signInWithEmailAndPassword(auth, email, password)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userLoggedIn = true
        }
        // User is signed out
      })
    },
    async signout() {
      await signOut(auth)
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.userLoggedIn = false
        }
      })
    },
    async checkForUser() {
      let checker
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          checker = true
        } else {
          console.log(checker)
        }
      })

      return checker
    }
  }
})
