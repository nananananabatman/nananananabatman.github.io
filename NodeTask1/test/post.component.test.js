import React from 'react';
import renderer from 'react-test-renderer';

import Post from '../src/post.component';

it('renders correctly', () => {
    const post = {
        author: 'author',
        blogId: 0,
        text: 'text'
    },
    tree = renderer
        .create(<Post onClick={() => {}} post={post} key={post.blogId} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
