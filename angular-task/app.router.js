const express = require('express');
const mongoose = require('mongoose');

let router = express.Router();

router.route('*')
    .get((req, res) => {
        res.sendfile('./index.html');
    });

module.exports = router;
