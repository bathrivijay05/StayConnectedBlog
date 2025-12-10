import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";

function Article() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/${id}`,
        {
          withCredentials: true,
        }
      );
      // console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPost = async (id) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/${id}`,
          { withCredentials: true }
        );
        setPost(res.data);
      } catch (err) {
        navigate("/404", { replace: true });
      }
    };
    fetchPost(id);
  }, [id]);

  return (
    <div className="article-container">
      <div className="article">
        <div className="article-info">
          {post?.category && (
            <Link
              to={`/category/${String(post?.category || " ").toLowerCase()}`}
              className="category"
            >
              {post?.category}
            </Link>
          )}
          <h1 className="article-title">{post?.title}</h1>
          <div className="article-meta">
            <div className="user-info">
              <span>Posted {moment(post?.created_at).fromNow()}</span>
              <span>
                by <b>{post?.username}</b>
              </span>
            </div>
            {currentUser && currentUser?.username === post?.username && (
              <div className="actions">
                <Link
                  className="edit-link edit"
                  to={`/write?id=${id}`}
                  state={post}
                >
                  <i className="fa fa-edit"></i> Edit
                </Link>
                <span className="edit-link delete" onClick={handleDelete}>
                  <i className="fa fa-trash"></i> Delete
                </span>
              </div>
            )}
          </div>
          <div className="article-desc">{post?.description}</div>
          <div className="article-image">
            <img src={post?.image} alt={post?.title} />
          </div>
        </div>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.content),
          }}
        ></div>
      </div>
    </div>
  );
}

export default Article;
