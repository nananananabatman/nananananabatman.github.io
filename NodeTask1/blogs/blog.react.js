import React from 'react';

import Post from './post/post.react';

export default class Blog extends React.Component {
    render() {
        let postCounter = 0;

        const blog = this.props.blog,
            textMask = this.props.textMask;
        const posts = blog
            .filter(post => post.author.toLowerCase().includes(textMask.toLowerCase()))
            .map(post => {
            return (<Post post={post} key={postCounter++} />)
        });

        return (
            <section className='blog'>{posts}</section>
        );
    }
}
