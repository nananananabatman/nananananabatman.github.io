const express = require('express');
const fs = require('fs');
const winston = require('winston');

let app = express(), logger,
    env = process.env.NODE_ENV || 'development',
    port = process.env.PORT || 8080,
    router = express.Router();

function tsFormat() {
    return (new Date()).toLocaleTimeString();
}

logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: 'log/results.log',
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

if (!fs.existsSync('log')) {
  fs.mkdirSync('log');
}

app.set('view engine', 'pug')

app.use('/', router);

app.use(function(req, res, next){
    res.status(404);

    if (req.accepts('json')) {
        logger.error('Page not found');
        res.render('page_not_found');
        return;
    }
});

router.route('/blogs')
    .get(function (req, res) {
        let blogPost;

        logger.info('It is a GET request for blogs');

        fs.readFile('blog.json', (err, data) => {
            if (err) throw err;
            blogPost = JSON.parse(data);
            res.render(
                'index',
                { title: blogPost.title, message: blogPost.text }
            );
        });
    })
    .post(function (req, res) {
        logger.info('It is a POST request for blogs');

        res.render(
            'index',
            { title: 'POST', message: 'It is a POST request for blogs'});
    });

router.route('/blogs/:blog_id')
    .delete(function (req, res) {
        logger.info('It is a DELETE request for ' + req.params.blog_id + ' blog');

        res.render(
            'index',
            { title: 'DELETE', message: 'It is a DELETE request for ' + req.params.blog_id + ' blog'});
    })
    .get(function (req, res) {
        logger.info('It is a GET request for ' + req.params.blog_id + ' blog');

        res.render(
            'index',
            { title: 'GET', message: 'It is a GET request for ' + req.params.blog_id + ' blog'});
    })
    .put(function (req, res) {
        logger.info('It is a PUT request for ' + req.params.blog_id + ' blog');

        res.render(
            'index',
            { title: 'PUT', message: 'It is a PUT request for ' + req.params.blog_id + ' blog'});
    });

app.listen(port);
