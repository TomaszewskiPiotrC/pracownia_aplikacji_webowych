const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            category: true,
            comments: true
        }
    });
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
            category: true,
            comments: true
        }
    });
    if (!post) {
        return res.status(404).json({ error: 'Post nie znaleziony' });
    }
    res.json(post);
});

router.post('/', async (req, res) => {
    const { title, content, published, categoryId } = req.body;
    if (!title || !content || !categoryId) {
        return res.status(400).json({
            error: 'Tytuł, treść i ID kategorii są wymagane'
        });
    }
    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            published: published || false,
            categoryId: parseInt(categoryId)
        },
        include: {
            category: true
        }
    });
    res.status(201).json(newPost);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, published, categoryId } = req.body;
    const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: {
            title,
            content,
            published,
            categoryId: categoryId ? parseInt(categoryId) : undefined
        },
        include: {
            category: true,
            comments: true
        }
    });
    res.json(updatedPost);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.post.delete({
        where: { id: parseInt(id) }
    });
    res.status(204).send();
});

module.exports = router;