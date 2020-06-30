import React from 'react';

const Post = ({ title, url }) => {
  return (
    <li>
      {title} <a href={url}>link</a>
    </li>
  );
};

export default Post;
