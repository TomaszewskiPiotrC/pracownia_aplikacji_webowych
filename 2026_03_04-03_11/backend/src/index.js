import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postsRouter from './routes/posts.js'
import commentsRouter from './routes/comments.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)

app.listen(PORT, () => {
    console.log(`Backend działa na http://localhost:${PORT}`)
})