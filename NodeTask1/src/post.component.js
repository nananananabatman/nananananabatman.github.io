import React from 'react';

export default class Post extends React.Component {
    render() {
        const onClick = this.props.onClick,
            post = this.props.post;

        return (
            <article onClick={onClick} className='blog-post'>
                <p className='blog-post__text'>{post.text}</p>
                <p className='blog-post__author'>{post.author}</p>
            </article>
        );
    }
}
