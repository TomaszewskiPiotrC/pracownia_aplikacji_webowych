import express from 'express'
import { addComment, getCommentsByPost } from '../controllers/commentController.js'

const router = express.Router()

router.get('/post/:postId', getCommentsByPost)
router.post('/', addComment)

export default router