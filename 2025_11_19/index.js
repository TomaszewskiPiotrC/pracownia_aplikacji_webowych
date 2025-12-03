const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express()

app.use(express.json());

const categoriesRouter = require('./routes/categories');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res) => {
    res.json({
        endpoints: {
            categories: '/categories',
            posts: '/posts',
            comments: '/comments'
        }
    });
});

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})