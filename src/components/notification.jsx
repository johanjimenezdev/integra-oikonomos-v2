import {
  Box,
  IconButton,
  MenuItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import { bankNames } from '../data/bank-names'
import { DeleteOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { delNotifications, readNotifications } from '../api/notifications'

function Notification({ notif }) {
  const isMobileDevice = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [openDelete, setOpenDelete] = useState(false)

  const calcTime = date => {
    const seconds = Math.floor((Date.now() - date) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
      return `hace ${Math.floor(interval)} años`
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return `hace ${Math.floor(interval)} meses`
    }
    interval = seconds / 86400
    if (interval > 1) {
      return `hace ${Math.floor(interval)} días`
    }
    interval = seconds / 3600
    if (interval > 1) {
      return `hace ${Math.floor(interval)} horas`
    }
    interval = seconds / 60
    if (interval > 1) {
      return `hace ${Math.floor(interval)} minutos`
    }
    return `hace ${Math.floor(interval)} segundos`
  }

  const since = calcTime(notif.date)

  return (
    <Box
      display="flex"
      width="100%"
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setOpenDelete(true)}
      onMouseLeave={() => setOpenDelete(false)}
    >
      <MenuItem
        onClick={() => {
          if (isMobileDevice) {
            notif.isRead
              ? setOpenDelete(!openDelete)
              : readNotifications(notif.id)
          } else {
            readNotifications(notif.id)
          }
        }}
        sx={{
          width: '100%',
          p: 0,
          pl: notif.isRead ? 1.6 : 1.2,
          borderLeft: notif.isRead ? 'none' : '4px solid #00b581'
        }}
      >
        <Box display="flex" width="100%" py={1} pr={1.6}>
          <Box display="flex" width="100%">
            <Box width="100%">
              <Typography fontSize={12} fontStyle="italic">
                {bankNames[notif.bank]}
              </Typography>
              <Typography
                fontSize={14}
                fontWeight={600}
                sx={{ whiteSpace: 'pre-line' }}
              >
                {`${notif.clientName}, ${notif.clientNid}`}
              </Typography>
              <Typography fontSize={14} fontWeight={500}>
                {notif.filingStatus}
              </Typography>
              <Typography fontSize={12}>{since}</Typography>
            </Box>
          </Box>
        </Box>
      </MenuItem>
      <Box
        width={53.11}
        sx={{
          display: openDelete ? 'block' : 'none'
        }}
      >
        <IconButton
          variant="contained"
          type="button"
          onClick={() => delNotifications(notif.id)}
          sx={{
            width: 53.11,
            minWidth: '100%',
            minHeight: '100%',
            p: 0,
            borderRadius: 0,
            color: 'error'
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Notification
