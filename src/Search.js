import React, { useState } from 'react';
import PostList from './PostList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postLimit, setPostLimit] = useState(10);
  const [posts, setPosts] = useState(false);
  const [pages, setPages] = useState({});
  const [error, setError] = useState(null);

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
