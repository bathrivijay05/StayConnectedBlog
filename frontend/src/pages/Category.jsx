import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import Error from "../components/Error";
import { useNavigate, useLocation } from "react-router-dom";

function Category() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/posts?category=${category}`
        );
        // console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        navigate("/404", { replace: true });
      }
    };
    fetchPosts();
  }, [category]);

  return (
    <div className="home-container">
      <div className="category-header">
        <h1>{String(category).toUpperCase()}</h1>
      </div>
      <div className="posts">
        {posts.length == 0 && <Error />}
        {posts &&
          posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </div>
    </div>
  );
}

export default Category;
