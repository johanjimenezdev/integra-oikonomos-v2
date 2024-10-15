import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { doc, getDoc } from 'firebase/firestore'
import { useSession } from '../../store/session'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  const { updateSession } = useSession()

  const signUp = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser)
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'Users', currentUser.uid))
        updateSession(userDoc.data(), true)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [updateSession])

  const authValue = {
    signUp,
    user,
    logIn,
    logOut,
    loading
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider

export { AuthContext }
