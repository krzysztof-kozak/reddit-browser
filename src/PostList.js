import React from 'react';
import Post from './Post';

const PostList = ({ posts, title, subtitle }) => {
  if (posts) {
    return (
      <>
        <h2 className='subreddit-title'>
          Posts from <b>r/{title}</b>
        </h2>
        <p className='list-info'>
          Sorted by: <b>{subtitle}</b>{' '}
        </p>
        <ul className='list'>
          {posts.map((post) => (
            <Post title={post.title} url={post.url} author={post.author} key={post.key} />
          ))}
        </ul>
      </>
    );
  } else {
    return null;
  }
};

export default PostList;
