const { getDatabase } = require('database.js');

const errorHandler = async (err, req, res, next) => {
    try {
        const db = getDatabase();
        const errorLogs = db.collection('errorLogs');

        const errorData = {
            timestamp: new Date(),
            method: req.method,
            url: req.url,
            originalUrl: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            error: {
                name: err.name,
                message: err.message,
                stack: err.stack,
                code: err.code
            },
            headers: {
                'content-type': req.get('Content-Type'),
                'accept': req.get('Accept')
            },
            query: req.query,
            body: req.method !== 'GET' ? maskSensitiveData(req.body) : undefined
        };

        await errorLogs.insertOne(errorData);
    } catch (logError) {
        console.error('Błąd podczas zapisywania error log:', logError);
    }

    let statusCode = err.statusCode || err.status || 500;

    if (err.code) {
        switch (err.code) {
            case 'P2002':
                statusCode = 409;
                break;
            case 'P2025':
                statusCode = 404;
                break;
            case 'P2003':
                statusCode = 400;
                break;
        }
    }

    const errorResponse = {
        error: {
            message: statusCode === 500 ? 'Internal Server Error' : err.message,
            code: err.code
        },
        timestamp: new Date().toISOString()
    };

    // W środowisku developerskim dodaj stack trace
    if (process.env.NODE_ENV === 'development') {
        errorResponse.error.stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
};

function maskSensitiveData(body) {
    if (!body || typeof body !== 'object') return body;

    const sensitiveFields = ['password', 'token', 'authorization', 'secret'];
    const maskedBody = { ...body };

    sensitiveFields.forEach(field => {
        if (maskedBody[field]) {
            maskedBody[field] = '***MASKED***';
        }
    });

    return maskedBody;
}

module.exports = errorHandler;