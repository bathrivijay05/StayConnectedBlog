import React from "react";
import { Link } from "react-router-dom";

function Card({ post }) {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="post" id={post.id}>
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <Link className="post-title" to={`/article/${post.id}`}>
          {post.title}
        </Link>
        <div className="post-desc">{getText(post.description)}</div>
        <Link className="read-more" to={`/article/${post.id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Card;
