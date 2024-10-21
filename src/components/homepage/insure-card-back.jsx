import { Box, Paper } from '@mui/material'
import CardOption from './card-option'
import {
  FolderOutlined,
  PendingActionsOutlined,
  RequestQuoteOutlined
} from '@mui/icons-material'

function InsureCardBack() {
  return (
    <Paper
      sx={{
        borderRadius: '1rem',
        '&:hover': {
          boxShadow:
            '0px 3px 3px -2px rgba(0, 181, 129, 0.2), 0px 3px 4px 0px rgba(0, 181, 129, 0.14), 0px 1px 8px 0px rgba(0, 181, 129, 0.12)'
        }
      }}
    >
      <Box
        display="flex"
        minHeight={250}
        flexDirection="column"
        justifyContent="center"
        p={2.4}
        gap={1.6}
      >
        <CardOption icon={<PendingActionsOutlined />} label="Solicitudes" />
        <CardOption icon={<FolderOutlined />} label="Documentos" />
      </Box>
    </Paper>
  )
}

export default InsureCardBack
