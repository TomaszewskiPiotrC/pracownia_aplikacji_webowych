const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const comments = await prisma.komentarz.findMany({
            include: {
                post: true
            }
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania komentarzy' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await prisma.komentarz.findUnique({
            where: { id: parseInt(id) },
            include: {
                post: true
            }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Komentarz nie znaleziony' });
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania komentarza' });
    }
});

router.post('/', async (req, res) => {
    const { author, content, postId } = req.body;

    if (!author || !content || !postId) {
        return res.status(400).json({
            error: 'Autor, treść i ID posta są wymagane'
        });
    }

    try {
        const newComment = await prisma.komentarz.create({
            data: {
                author,
                content,
                postId: parseInt(postId)
            },
            include: {
                post: true
            }
        });

        res.status(201).json(newComment);
    } catch (error) {
        if (error.code === 'P2003') {
            res.status(400).json({ error: 'Podany post nie istnieje' });
        } else {
            res.status(500).json({ error: 'Błąd podczas tworzenia komentarza' });
        }
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { author, content, postId } = req.body;

    try {
        const updatedComment = await prisma.komentarz.update({
            where: { id: parseInt(id) },
            data: {
                author,
                content,
                modifiedAt: new Date(),
                postId: postId ? parseInt(postId) : undefined
            },
            include: {
                post: true
            }
        });

        res.json(updatedComment);
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Komentarz nie znaleziony' });
        } else if (error.code === 'P2003') {
            res.status(400).json({ error: 'Podany post nie istnieje' });
        } else {
            res.status(500).json({ error: 'Błąd podczas aktualizacji komentarza' });
        }
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.komentarz.delete({
            where: { id: parseInt(id) }
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Komentarz nie znaleziony' });
        } else {
            res.status(500).json({ error: 'Błąd podczas usuwania komentarza' });
        }
    }
});

module.exports = router;