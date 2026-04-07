import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getCommentsByPost = async (req, res) => {
    const { postId } = req.params
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: parseInt(postId) }
        })
        res.json(comments)
    } catch (error) {
        res.status(500).json({ error: 'Błąd pobierania komentarzy' })
    }
}

export const addComment = async (req, res) => {
    const { name, email, body, postId } = req.body
    if (!name || !email || !body || !postId) {
        return res.status(400).json({ error: 'Brak wymaganych pól' })
    }
    try {
        const newComment = await prisma.comment.create({
            data: { name, email, body, postId: parseInt(postId) }
        })
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({ error: 'Błąd dodawania komentarza' })
    }
}