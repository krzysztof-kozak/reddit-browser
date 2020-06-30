import React, { useState } from 'react';
import Post from './Post';

const PostList = ({ posts, fetchPosts, pages, sortBy }) => {
  const [numberOfPostsFetched, setNumberOfPostsFetched] = useState(0);

  const handleNextPage = () => {
    setNumberOfPostsFetched((prev) => prev + posts.length);
    fetchPosts(null, pages.after, numberOfPostsFetched);
  };

  const handlePrevPage = () => {
    setNumberOfPostsFetched((prev) => {
      if (prev - posts.length >= 0) {
        setNumberOfPostsFetched((prev) => prev - posts.length);
      } else {
        setNumberOfPostsFetched(0);
      }
    });
    fetchPosts(pages.before, null, numberOfPostsFetched);
  };

  if (posts) {
    return (
      <>
        <h2 className='subreddit-title'>
          Posts from <b>{posts[0].subredditName}</b>
        </h2>

        <p className='list-info'>
          Sorted by: <b>{sortBy}</b>{' '}
        </p>

        <ul className='list'>
          {posts.map((post) => (
            <Post title={post.title} url={post.url} author={post.author} key={post.key} />
          ))}
        </ul>
        <div className='button-wrapper'>
          <button className='list__button' onClick={handlePrevPage}>
            Prev Page
          </button>
          <button className='list__button' onClick={handleNextPage}>
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
