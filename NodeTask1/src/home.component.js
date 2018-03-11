import { connect } from 'react-redux';
import React from 'react';

import Blog from './blog.component';
import PostForm from './post-form.component';
import Search from './search.component';

async function callApi(request) {
    const response = await fetch('/api/blogs', {
        method: request.method,
        body: request.body,
        headers: {"Content-Type": "application/json"}
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
}

class Home extends React.Component {
    addPost(author, text) {
        const post = {blogId: Math.random().toString(36).substr(2, 9), author: author, text: text}

        this.getBlogsData({method: 'POST', body: JSON.stringify(post)});
    }

    addTextMask(text) {
        this.props.dispatch({
            type: 'CHANGE_TEXT_MASK',
            textMask: text
        });
    }

    checkCurrentUser() {
        let user = localStorage.getItem('currentUser');

        if (user) {
            this.props.dispatch({
                type: 'LOGIN',
                user: user
            });
        }
    }

    constructor(props) {
        super(props);
        this.checkCurrentUser();
    }

    componentDidMount() {
        this.getBlogsData({method: 'GET'});
    }

    deletePost(blogId) {
        this.getBlogsData({method: 'DELETE', body: JSON.stringify({blogId: blogId})});
    }

    getBlogsData(request) {
        callApi(request)
            .then(res => this.props.dispatch({
                type: 'UPDATE',
                blog: res.blogPosts
            }))
            .catch(err => console.log(err));
    }

    login() {
        this.props.history.push('login');
    }

    logout() {
        this.props.dispatch({type: 'LOGOUT'});
        localStorage.removeItem('currentUser');
    }

    render() {
        let reduxState = this.props.reduxState;

        return (
            <div>
                {
                    this.props.reduxState.user
                        ? <span className="user"><span>Hello, {this.props.reduxState.user}</span><button onClick={this.logout.bind(this)}>Log Out</button></span>
                        : <span className="user"><button onClick={this.login.bind(this)}>Log In</button></span>
                }
                <h1 className='blog__heading'>Blog</h1>
                {this.props.reduxState.user && <Search addTextMask={this.addTextMask.bind(this)} />}
                {this.props.reduxState.user && <PostForm addPost={this.addPost.bind(this)} />}
                <Blog onPostClick={this.deletePost.bind(this)} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        reduxState: state
    }
};

const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;
