import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server Running")
})
