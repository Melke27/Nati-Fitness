import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'coach-nati-api', time: new Date().toISOString() })
})

// v1 route groups
app.use('/api/auth', (await import('./routes/auth.js')).default)
app.use('/api/clients', (await import('./routes/clients.js')).default)
app.use('/api/programs', (await import('./routes/programs.js')).default)
app.use('/api/payments', (await import('./routes/payments.js')).default)
app.use('/api/content', (await import('./routes/content.js')).default)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Coach Nati API listening on http://localhost:${PORT}`)
})
