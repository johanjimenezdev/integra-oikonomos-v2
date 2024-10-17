import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../firebase/context/auth-provider'
import { getNotifications } from '../api/notifications'

const useNotifications = () => {
  const { user } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = () => {
    try {
      getNotifications(user.uid, setNotifications)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [user?.uid])

  return { notifications }
}

export { useNotifications }
