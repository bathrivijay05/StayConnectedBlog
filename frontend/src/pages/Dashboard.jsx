import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/user/all`,
          { withCredentials: true }
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [currentUser, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/${id}`,
        { withCredentials: true }
      );
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Posts</h1>
        <Link to="/write" className="create-btn">
          Create Post
        </Link>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-image">
              <img src={post.image} alt="" />
            </div>
            <div className="post-content">
              <div className="post-header-row">
                {post.is_published ? (
                  <Link className="post-title" to={`/article/${post.id}`}>
                    {post.title}
                  </Link>
                ) : (
                  <span className="post-title" style={{ cursor: "default" }}>
                    {post.title}
                  </span>
                )}
                <span
                  className={`status-badge ${
                    post.is_published ? "published" : "draft"
                  }`}
                >
                  {post.is_published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="post-desc">{getText(post.description)}</div>
              <div className="actions">
                <Link
                  to={`/write?edit=${post.id}`}
                  state={post}
                  className="edit-btn"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
