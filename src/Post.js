import React from 'react';

const Post = ({ title, url, author }) => {
  return (
    <li>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        {title}
      </a>
    </li>
  );
};

export default Post;
