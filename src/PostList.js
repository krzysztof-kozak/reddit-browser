import React from 'react';
import Post from './Post';

const PostList = ({ posts, pages, fetchPosts }) => {
  const handleClick = (e) => {
    if (typeof fetchPosts === 'function') {
      switch (e.target.value) {
        case 'prev':
          fetchPosts(pages.before, null, 0);
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
        <ul className='list'>
          {posts.map((post) => (
            <Post title={post.title} url={post.url} subredditName={post.subredditName} author={post.author} key={post.key} />
          ))}
        </ul>
        <div class='button-wrapper'>
          <button className='list__button' value='prev' onClick={handleClick}>
            Prev Page
          </button>
          <button className='list__button' value='next' onClick={handleClick}>
            Next Page
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default PostList;
