import { useContext } from 'react'
import { AuthContext } from '../firebase/context/auth-provider'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import Header from './header'
import Loading from './loading'

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (user) {
    return loading ? (
      <Loading />
    ) : (
      <Box display="flex" flexDirection="column" height="100%" maxHeight="100%">
        <Header />
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
