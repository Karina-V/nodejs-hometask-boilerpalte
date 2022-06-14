const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query

    if (res.err) {
        return res.json({ error: true, message: `${res.err}` });
    } else if (res.data) {
        return res.json(res.data);
    }

    next();
}

exports.responseMiddleware = responseMiddleware;