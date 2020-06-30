import React, { useState } from 'react';
import PostList from './PostList';

const Search = () => {
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
