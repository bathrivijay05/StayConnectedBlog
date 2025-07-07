import React from "react";
import { Link } from "react-router-dom";

function Card({ post }) {
  return (
    <div className="post" id={post.id}>
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <Link className="post-title" to={`/article/${post.id}`}>
          {post.title}
        </Link>
        <div className="post-desc">{post.description}</div>
      </div>
    </div>
  );
}

export default Card;
