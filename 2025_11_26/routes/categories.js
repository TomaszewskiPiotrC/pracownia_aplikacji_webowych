const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await prisma.kategoria.findMany({
        include: {
            posts: true
        }
    });
    res.json(categories);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const category = await prisma.kategoria.findUnique({
        where: { id: parseInt(id) },
        include: {
            posts: true
        }
    });
    if (!category) {
        return res.status(404).json({ error: 'Kategoria nie znaleziona' });
    }
    res.json(category);
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Nazwa kategorii jest wymagana' });
    }
    const newCategory = await prisma.kategoria.create({
        data: {
            name,
            description
        }
    });
    res.status(201).json(newCategory);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCategory = await prisma.kategoria.update({
        where: { id: parseInt(id) },
        data: {
            name,
            description
        }
    });
    res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.kategoria.delete({
        where: { id: parseInt(id) }
    });
    res.status(204).send();
});

module.exports = router;