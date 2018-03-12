import { connect } from 'react-redux';
import React from 'react';

import Blog from './blog.component';
import PostForm from './post-form.component';
import Search from './search.component';
import blogService from './blogs-api.service';

class Home extends React.Component {
    addPost(author, text) {
        const post = {blogId: Math.random().toString(36).substr(2, 9), author: author, text: text}

        this.getBlogsData({url: '/api/blogs', method: 'POST', body: JSON.stringify(post)});
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
        this.getBlogsData({url: '/api/blogs', method: 'GET'});
    }

    deletePost(blogId) {
        this.getBlogsData({url: '/api/blogs', method: 'DELETE', body: JSON.stringify({blogId: blogId})});
    }

    getBlogsData(request) {
        blogService.sendRequest(request)
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
                        ? <span className="header">
                            <span className="user-name">Hello, {this.props.reduxState.user}</span>
                            <button className="header-button" onClick={this.logout.bind(this)}>Log Out</button>
                        </span>
                        : <span className="header"><button className="header-button" onClick={this.login.bind(this)}>Log In</button></span>
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
