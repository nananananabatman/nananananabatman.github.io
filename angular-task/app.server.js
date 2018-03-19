const bodyParser = require('body-parser');
const express = require('express');

const router = require('./app.router');

let app = express(),
    port = process.env.PORT || 3535;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/'), router);

app.use((err, req, res, next) => {
    res.status(500);
    logger.error(err);
})

app.use((req, res, next) => {
    res.status(404);

    if (req.accepts('json')) {
        logger.error('Page not found');
        res.render('page_not_found');
        return;
    }
});

app.listen(port);
