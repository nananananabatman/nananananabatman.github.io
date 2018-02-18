import React from 'react';
import ReactDOM from 'react-dom';

import Blog from './blog.react';
import PostForm from './post/post-form.react';
import Search from './search.react';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blog: [],
            textMask: ''
        };
    }

    addPost(author, text) {
        const post = {author: author, text: text}

        this.state.blog.push(post);
        this.setState({blog: this.state.blog});
    }

    addTextMask(text) {
        this.setState({textMask: text});
    }

    render(){
        return (
            <div>
                <h1 className='blog__heading'>Blog</h1>
                <Search addTextMask={this.addTextMask.bind(this)} />
                <PostForm addPost={this.addPost.bind(this)} />
                <Blog blog={this.state.blog} textMask={this.state.textMask} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
