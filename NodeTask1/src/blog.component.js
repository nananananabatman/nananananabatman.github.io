import { connect } from 'react-redux';
import React from 'react';

import Post from './post.component';

class Blog extends React.Component {
    render() {
        const blog = this.props.reduxState.blog,
            onPostClick = this.props.onPostClick,
            textMask = this.props.reduxState.textMask,
            posts = blog
                .filter(post => post.author.toLowerCase().includes(textMask.toLowerCase()))
                .map((post, index) => {
                    return (<Post onClick={() => onPostClick(post.blogId)} post={post} key={index} />)
                });

        return (
            <section className='blog'>{posts}</section>
        );
    }
}

const mapStateToProps = state => {
    return {
        reduxState: state
    }
};

const ConnectedBlog = connect(mapStateToProps)(Blog);

export default ConnectedBlog;
