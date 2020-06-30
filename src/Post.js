import React from 'react';

const Post = ({ title, url, author }) => {
  return (
    <li className='list__item'>
      <a className='link' href={`https://www.reddit.com/${url}`} target='_blank' rel='noopener noreferrer'>
        {title}
      </a>
      <p className='author'>
        posted by <strong>{author}</strong>
      </p>
    </li>
  );
};

export default Post;
