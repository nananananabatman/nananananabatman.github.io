const express = require('express');
const fs = require('fs');
const logger = require('./log/logger');
const mongoose = require('mongoose');

let app = express(),
    blogSchema = mongoose.Schema({
        blogId: String,
        title: String,
        text: String
    }),
    blog = mongoose.model('blog', blogSchema),
    port = process.env.PORT || 8080,
    router = express.Router();

function getAll(res) {
    blog.find((err, blogPosts) => {
        logger.info('It is a GET request for blogs');

        if(err) {
            res.send(err);
        }
        res.render(
            'index',
            { blogPosts: blogPosts }
        );
    });
}

mongoose.connect('mongodb://user:123@ds223268.mlab.com:23268/node-task');

if (!fs.existsSync('log')) {
  fs.mkdirSync('log');
}

app.set('view engine', 'pug')

app.use('/', router);

router.route('/blogs/:blog_id')
    .delete((req, res) => {
        logger.info('It is a DELETE request for ' + req.params.blog_id + ' blog');

        blog.remove({
            blogId: req.params.blog_id
        }, (err, result) => {
            if(err) {
                res.send(err);
            }

            getAll(res);
        });
    })
    .get((req, res) => {
        logger.info('It is a GET request for ' + req.params.blog_id + ' blog');

        blog.find({
            blogId: req.params.blog_id
        }, (err, blogPosts) => {
            if(err) {
                res.send(err);
            }
            res.render(
                'index',
                { blogPosts: blogPosts }
            );
        });
    })
    .put((req, res) => {
        logger.info('It is a PUT request for ' + req.params.blog_id + ' blog');

        blog.update({
            blogId: req.params.blog_id
        }, {
            title: req.query.title,
            text: req.query.text
        }, (err, result) => {
            if(err) {
                res.send(err);
            }
            getAll(res);
        });
    });

router.route('/blogs')
    .get((req, res) => {
        getAll(res);
    })
    .post((req, res) => {
        logger.info('It is a POST request for blogs');

        blog.create({
            title: req.query.title,
            text: req.query.text,
            blogId: req.query.blogId
        }, (err, result) => {
            if(err) {
                res.send(err);
            }

            getAll(res);
        });
    });

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
