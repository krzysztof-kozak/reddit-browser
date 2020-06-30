import React, { useState } from 'react';
import PostList from './PostList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postLimit, setPostLimit] = useState(10);
  const [posts, setPosts] = useState(false);
  const [pages, setPages] = useState({});
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      fetchPosts();
    }
  };

  const handlePostLimiChange = (e) => {
    setPostLimit(e.target.value);
  };

  const fetchPosts = async (prevPage = null, nextPage = null, count = 0) => {
    const response = await fetch(
      `https://www.reddit.com/r/${searchQuery}/new.json?limit=${postLimit}&count=${count}${nextPage ? `&after=${nextPage}` : ''}${prevPage ? `&before=${prevPage}` : ''}`
    );

    if (response.status === 404) {
      console.log(response);
      setError(`I couldn't find this subreddit: https://www.reddit.com/r/${searchQuery}`);
      setPosts(false);
    } else {
      const responseJson = await response.json();
      setError(null);

      parseResponses(responseJson);
      setPagination(responseJson);
    }
  };

  const parseResponses = (responseJson) => {
    const posts = responseJson.data.children.map((child) => {
      return { title: child.data.title, url: child.data.url, key: child.data.id };
    });
    setPosts(posts);
  };

  const setPagination = (responseJson) => {
    setPages({ before: responseJson.data.before, after: responseJson.data.after });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Reddit App</h1>
        <div>
          <p>
            <label>reddit/r</label>
            <input id='search' onChange={(e) => setSearchQuery(e.target.value.replace(/\s+/g, ''))}></input>
          </p>

          <p>
            <button type='submit'>search</button>
          </p>

          <p>
            <label htmlFor='postLimit'>Posts per page</label>
            <select id='postLimit' value={postLimit} onChange={handlePostLimiChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </p>
          {error ? <p>{error}</p> : null}
        </div>
      </form>
      <PostList posts={posts} pages={pages} fetchPosts={fetchPosts} />
    </>
  );
};

export default Search;
