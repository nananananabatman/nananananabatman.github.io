import React from 'react';

export default class PostForm extends React.Component {
    render() {
        const addPost = this.props.addPost;

        let author,
            text;

        return (
            <div className='add-new-post'>
                <textarea className='add-new-post__text' placeholder='Enter post text...' ref={node => {
                    text = node;
                }} />
                <input className='add-new-post__author' placeholder='Enter you name...' ref={node => {
                    author = node;
                }} />
                <button className='add-new-post__button' onClick={() => {
                    if (author.value && text.value) {
                        addPost(author.value, text.value);
                        author.value = '';
                        text.value = '';
                    }
                }}>Add post</button>
            </div>
        );
    }
}
