const express = require('express');
const mongoose = require('mongoose');

let router = express.Router();

// function getAll(res) {
//     blog.find((err, blogPosts) => {
//         logger.info('It is a GET request for blogs');
//
//         if (err) {
//             res.send(err);
//         }
//
//         res.send({blogPosts: blogPosts});
//     });
// }
//
// mongoose.connect('mongodb://user:123@ds223268.mlab.com:23268/node-task');
//
// router.route('/api/login')
//     .put((req, res) => {
//         logger.info('It is a PUT request for user');
//
//         user.findOne({
//             name: req.body.name,
//             pass: req.body.pass
//         }, (err, user) => {
//             if (err) {
//                 res.send(err);
//             }
//
//             res.send({user: user ? user.name : ''});
//         });
//     });
//
// router.route('/api/signup')
//     .put((req, res) => {
//         logger.info('It is a PUT request for new user');
//
//         user.findOne({
//             name: req.body.name
//         }, (err, userRes) => {
//             if (err) {
//                 res.send(err);
//             }
//
//             if (!userRes) {
//                 user.create({
//                     name: req.body.name,
//                     pass: req.body.pass
//                 }, (error, result) => {
//                     if (error) {
//                         res.send(error);
//                     }
//
//                     res.send({user: result.name});
//                 });
//             } else {
//                 res.send({user: ''});
//             }
//         });
//     });
//
// router.route('/api/blogs')
//     .delete((req, res) => {
//         logger.info('It is a DELETE request for ' + req.body.blogId + ' blog');
//
//         blog.remove({
//             blogId: req.body.blogId
//         }, (err, result) => {
//             if(err) {
//                 res.send(err);
//             }
//
//             getAll(res);
//         });
//     })
//     .get((req, res) => {
//         logger.info('It is a GET request for blogs in router');
//
//         getAll(res);
//     })
//     .post((req, res) => {
//         logger.info('It is a POST request for blogs');
//
//         blog.create({
//             author: req.body.author,
//             text: req.body.text,
//             blogId: req.body.blogId
//         }, (err, result) => {
//             if(err) {
//                 res.send(err);
//             }
//
//             getAll(res);
//         });
//     });

router.route('*')
    .get((req, res) => {
        res.sendfile('./src/app.html');
    });

module.exports = router;
