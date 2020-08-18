import React, { useState } from "react";
import PostList from "./PostList";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postLimit, setPostLimit] = useState(10);
  const [sortBy, setSortBy] = useState("new");
  const [posts, setPosts] = useState(false);
  const [pages, setPages] = useState({});
  const [error, setError] = useState(null);
  const [numberOfPostsFetched, setNumberOfPostsFetched] = useState(0);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetCount();
    setSubTitle(e.target.sortBy.value.replace(/\s+/g, "").toLowerCase());
    setTitle(e.target.search.value);

    if (searchQuery) {
      fetchPosts();
    }
  };

  const resetCount = () => {
    setNumberOfPostsFetched(0);
  };

  const handlePostLimitChange = (e) => {
    setPostLimit(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleNextPage = () => {
    let isRun = true;
    setNumberOfPostsFetched((prev) => {
      if (isRun) {
        isRun = !isRun;
        fetchPosts(null, pages.after, prev + posts.length);
      }
      return prev + posts.length;
    });
  };

  const handlePrevPage = () => {
    let isRun = true;
    setNumberOfPostsFetched((prev) => {
      const currentCount = prev - posts.length > 0 ? prev - posts.length : 0;
      if (isRun) {
        isRun = !isRun;
        fetchPosts(pages.before, null, currentCount);
      }
      return currentCount;
    });
  };

  const fetchPosts = async (prevPage = null, nextPage = null, count = 0) => {
    // if (count === 0) {
    //   prevPage = null;
    // }
    const response = await fetch(
      `https://www.reddit.com/r/${searchQuery}/${sortBy}.json?limit=${postLimit}&count=${count}${
        nextPage ? `&after=${nextPage}` : ""
      }${prevPage ? `&before=${prevPage}` : ""}`
    );

    if (response.status === 404) {
      setError(
        `I couldn't find this subreddit: https://www.reddit.com/r/${searchQuery}`
      );
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
      // .filter((post) => post.data.stickied === false)
      .map((child) => {
        return {
          title: child.data.title,
          url: child.data.permalink,
          subredditName: child.data.subreddit_name_prefixed,
          author: child.data.author,
          key: child.data.id,
        };
      });
    setPosts(posts);
  };

  const setPagination = (responseJson) => {
    setPages({
      before: responseJson.data.before,
      after: responseJson.data.after,
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Reddit App</h1>

        <p className="search-wrapper">
          <label className="form__label form__label--main">reddit/r</label>
          <input
            className="form__input"
            id="search"
            placeholder="e.g reactjs"
            onChange={(e) => setSearchQuery(e.target.value.replace(/\s+/g, ""))}
          ></input>
        </p>

        <p className="search-wrapper">
          <label className="form__label" htmlFor="postLimit">
            posts per page
          </label>
          <select
            className="form__select"
            id="postLimit"
            name="postLimit"
            onChange={handlePostLimitChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </p>

        <p className="search-wrapper">
          <label className="form__label" htmlFor="sortBy">
            sort posts by
          </label>
          <select
            className="form__select"
            id="sortBy"
            name="sortBy"
            onChange={handleSortByChange}
            value={sortBy}
          >
            <option value="new">new</option>
            <option value="top">top</option>
            <option value="hot">hot</option>
            <option value="rising">rising</option>
          </select>
        </p>

        <button className="form__button" type="submit">
          search
        </button>

        {error ? <p className="error">{error}</p> : null}
      </form>

      <PostList posts={posts} title={title} subtitle={subTitle} />
      <div className="button-wrapper">
        <button
          className={posts ? "list__button" : "hidden"}
          onClick={handlePrevPage}
        >
          Prev Page
        </button>
        <button
          className={posts ? "list__button" : "hidden"}
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default Search;
