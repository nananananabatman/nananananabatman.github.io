import React from 'react';

export default class Post extends React.Component {
    render() {
        const post = this.props.post;

        return (
            <article className='blog-post'>
                <p className='blog-post__text'>{post.text}</p>
                <p className='blog-post__author'>{post.author}</p>
            </article>
        );
    }
}
