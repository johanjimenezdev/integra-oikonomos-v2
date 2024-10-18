import { Box, Paper } from '@mui/material'
import CardOption from './card-option'
import {
  FolderOutlined,
  PendingActionsOutlined,
  RequestQuoteOutlined
} from '@mui/icons-material'

function RealEstatesCardBack() {
  return (
    <Paper sx={{ borderRadius: '1rem' }}>
      <Box
        display="flex"
        minHeight={250}
        flexDirection="column"
        justifyContent="center"
        p={2.4}
        gap={1.6}
      >
        <CardOption icon={<PendingActionsOutlined />} label="Solicitudes" />
        <CardOption icon={<RequestQuoteOutlined />} label="Reportes" />
        <CardOption icon={<FolderOutlined />} label="Documentos" />
      </Box>
    </Paper>
  )
}

export default RealEstatesCardBack
