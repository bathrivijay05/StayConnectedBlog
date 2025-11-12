import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import Error from "../components/Error";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts`
        );
        // console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div className="posts">
        {posts.length === 0 && <Error />}
        {posts.length !== 0 &&
          posts.map((post) => <Card post={post} key={post.id} />)}
      </div>
    </div>
  );
}

export default Home;
