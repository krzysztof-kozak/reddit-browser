import React from 'react';
import Post from './Post';

const PostList = () => {
  return (
    <>
      <ul>
        <Post />
        <Post />
      </ul>
      <button>Prev Page</button>
      <button>Next Page</button>
    </>
  );
};

export default PostList;
