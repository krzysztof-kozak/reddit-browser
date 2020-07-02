import React, { useState } from 'react';
import PostList from './PostList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postLimit, setPostLimit] = useState(10);
  const [sortBy, setSortBy] = useState('new');
  const [posts, setPosts] = useState(false);
  const [pages, setPages] = useState({});
  const [error, setError] = useState(null);
  const [numberOfPostsFetched, setNumberOfPostsFetched] = useState(0);
  const [title, setTitle] = useState(0);
  const [subtitle, setSubTitle] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle(e.target.search.value.replace(/\s+/g, '').toLowerCase());
    setSubTitle(e.target.sortBy.value);
    if (searchQuery) {
      fetchPosts();
    }
  };

  const handlePostLimiChange = (e) => {
    setPostLimit(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleNextPage = () => {
    setNumberOfPostsFetched((prev) => prev + posts.length);
    fetchPosts(null, pages.after, numberOfPostsFetched);
  };

  const handlePrevPage = () => {
    setNumberOfPostsFetched((prev) => {
      if (prev >= posts.length) {
        setNumberOfPostsFetched((prev) => prev - posts.length);
      } else {
        setNumberOfPostsFetched(0);
      }
    });
    fetchPosts(pages.before, null, numberOfPostsFetched);
  };

  const fetchPosts = async (prevPage = null, nextPage = null, count = 0) => {
    const response = await fetch(
      `https://www.reddit.com/r/${searchQuery}/${sortBy}.json?limit=${postLimit}&count=${count}${nextPage ? `&after=${nextPage}` : ''}${prevPage ? `&before=${prevPage}` : ''}`
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
    const posts = responseJson.data.children

      //Sticked posts do not adhere to the post per page limit. Filtering them out is not ideal, but I couldn't find a better solution.
      .filter((post) => post.data.stickied === false)
      .map((child) => {
        return { title: child.data.title, url: child.data.permalink, subredditName: child.data.subreddit_name_prefixed, author: child.data.author, key: child.data.id };
      });
    setPosts(posts);
  };

  const setPagination = (responseJson) => {
    setPages({ before: responseJson.data.before, after: responseJson.data.after });
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Reddit App</h1>

        <p className='search-wrapper'>
          <label className='form__label form__label--main'>reddit/r</label>
          <input className='form__input' id='search' placeholder='e.g reactjs' onChange={(e) => setSearchQuery(e.target.value.replace(/\s+/g, ''))}></input>
        </p>

        <p className='search-wrapper'>
          <label className='form__label' htmlFor='postLimit'>
            posts per page
          </label>
          <select className='form__select' id='postLimit' value={postLimit} onChange={handlePostLimiChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </p>

        <p className='search-wrapper'>
          <label className='form__label' htmlFor='sortBy'>
            sort posts by
          </label>
          <select className='form__select' id='sortBy' name='sortBy' value={sortBy} onChange={handleSortByChange}>
            <option value='new'>new</option>
            <option value='top'>top</option>
            <option value='hot'>hot</option>
            <option value='rising'>rising</option>
          </select>
        </p>

        <button className='form__button' type='submit'>
          search
        </button>

        {error ? <p className='error'>{error}</p> : null}
      </form>

      <PostList posts={posts} title={title} subtitle={subtitle} />
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
};

export default Search;
