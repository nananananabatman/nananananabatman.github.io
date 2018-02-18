const express = require('express');
const logger = require('./log/logger');

let app = express(),
    port = process.env.PORT || 8080,
    router = express.Router();

app.use(express.static(__dirname + '/'), router);

router.route('*')
    .get((req, res) => {
        res.sendFile('./index.html');
    });

app.listen(port);
