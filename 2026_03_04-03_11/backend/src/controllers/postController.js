import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Błąd pobierania postów' })
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: { comments: true }
        })
        if (!post) {
            return res.status(404).json({ error: 'Post nie istnieje' })
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: 'Błąd pobierania posta' })
    }
}