const express = require('express')
const { PrismaClient } = require('@prisma/client');
const { connectToDatabase } = require('database.js');
const accessLogger = require('./middleware/accessLogger');
const errorHandler = require('./middleware/errorHandler');

const prisma = new PrismaClient();
const app = express()

connectToDatabase().catch(console.error);

app.use(express.json());

app.use(accessLogger);

const categoriesRouter = require('./routes/categories');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'REST API jest aktywne',
        endpoints: {
            categories: '/categories',
            posts: '/posts',
            comments: '/comments'
        },
        timestamp: new Date().toISOString()
    });
});

app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        const { getDatabase } = require('database.js');
        const db = getDatabase();
        await db.command({ ping: 1 });

        res.json({
            status: 'OK',
            database: {
                postgresql: 'connected',
                mongodb: 'connected'
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: 'ERROR',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.use('*', (req, res, next) => {
    const error = new Error(`Endpoint ${req.originalUrl} nie znaleziony`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

process.on('SIGINT', async () => {
    console.log('\nOtrzymano SIGINT. Zamykanie aplikacji...');
    await prisma.$disconnect();
    const { closeDatabase } = require('database.js');
    await closeDatabase();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Otrzymano SIGTERM. Zamykanie aplikacji...');
    await prisma.$disconnect();
    const { closeDatabase } = require('database.js');
    await closeDatabase();
    process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})