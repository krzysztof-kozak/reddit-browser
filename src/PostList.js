import React from 'react';
import Post from './Post';

const PostList = ({ posts, pages, fetchPosts }) => {
  const handleClick = (e) => {
    if (typeof fetchPosts === 'function') {
      switch (e.target.value) {
        case 'prev':
          fetchPosts(pages.before, null, 0);
          console.log(pages.before);
          break;
        case 'next':
          fetchPosts(null, pages.after, posts.length);
          break;

        default:
          return;
      }
    }
  };

  if (posts) {
    return (
      <>
        <ul>
          {posts.map((post) => (
            <Post title={post.title} url={post.url} key={post.key} />
          ))}
        </ul>
        <button value='prev' onClick={handleClick}>
          Prev Page
        </button>
        <button value='next' onClick={handleClick}>
          Next Page
        </button>
      </>
    );
  } else {
    return null;
  }
};

export default PostList;
