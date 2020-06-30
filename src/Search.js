import React, { useState } from 'react';
import PostList from './PostList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postLimit, setPostLimit] = useState(10);
  const [posts, setPosts] = useState(false);
  const [pages, setPages] = useState({});
  const [error, setError] = useState(null);

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
      return { title: child.data.title, url: child.data.url };
    });
    setPosts(posts);
  };

  const setPagination = (responseJson) => {
    setPages({ before: responseJson.data.before, after: responseJson.data.after });
  };

  return (
    <>
      <form>
        <h1>Reddit App</h1>
        <div>
          <p>
            <label>reddit/r</label>
            <input></input>
          </p>

          <p>
            <button type='submit'>search</button>
          </p>
        </div>
      </form>
      <PostList />
    </>
  );
};

export default Search;
