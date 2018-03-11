import React from 'react';

export default class PostForm extends React.Component {
    render() {
        const addPost = this.props.addPost;

        let author,
            text;

        return (
            <div className='form'>
                <textarea className='add-new-post__text' placeholder='Enter post text...' ref={node => {
                    text = node;
                }} />
                <input className='form-input' placeholder='Enter you name...' ref={node => {
                    author = node;
                }} />
                <button className='form-submit' onClick={() => {
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
