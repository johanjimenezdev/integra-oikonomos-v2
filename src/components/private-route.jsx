import { useContext } from 'react'
import { AuthContext } from '../firebase/context/auth-provider'
import { useSession } from '../store/session'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import Header from './header'
import Loading from './loading'
import { useNotifications } from '../hooks/useNotifications'

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  const { session } = useSession()
  const { notifications } = useNotifications()

  if (user) {
    return loading || !session.auth ? (
      <Loading />
    ) : (
      <Box display="flex" flexDirection="column" height="100%" maxHeight="100%">
        <Header notifications={notifications} />
        <Box mt={6.4}>{children}</Box>
      </Box>
    )
  }

  return <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  children: PropTypes.node
}

export default PrivateRoute
