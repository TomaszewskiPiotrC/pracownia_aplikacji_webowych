const { getDatabase } = require('database.js');

const accessLogger = async (req, res, next) => {
    const start = Date.now();

    res.on('finish', async () => {
        try {
            const db = getDatabase();
            const accessLogs = db.collection('accessLogs');

            const logData = {
                timestamp: new Date(),
                method: req.method,
                url: req.url,
                originalUrl: req.originalUrl,
                ip: req.ip || req.connection.remoteAddress,
                userAgent: req.get('User-Agent'),
                statusCode: res.statusCode,
                responseTime: Date.now() - start,
                headers: {
                    'content-type': req.get('Content-Type'),
                    'accept': req.get('Accept'),
                    'authorization': req.get('Authorization') ? 'Present' : 'Missing'
                },
                query: Object.keys(req.query).length > 0 ? req.query : undefined,
                body: req.method !== 'GET' ? maskSensitiveData(req.body) : undefined
            };

            await accessLogs.insertOne(logData);
        } catch (error) {
            console.error('Błąd podczas zapisywania access log:', error);
        }
    });

    next();
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

module.exports = accessLogger;