import db from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const query = req.query.category
    ? "SELECT * FROM posts WHERE LOWER(category) = LOWER($1) AND is_published = true ORDER BY created_at DESC"
    : "SELECT * FROM posts WHERE is_published = true ORDER BY created_at DESC";

  const params = req.query.category ? [req.query.category] : [];

  db.query(query, params, (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (req.query.category && data.rows.length == 0)
      return res.status(404).json("Not Found");
    return res.status(200).json(data.rows);
  });
};

export const getPost = (req, res) => {
  const query =
    "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1;";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.rows.length === 0) return res.status(404).json("Post not found.");

    const post = data.rows[0];

    if (!post.is_published) {
      return res
        .status(403)
        .json("Draft posts cannot be viewed until published.");
    } else {
      return res.status(200).json(post);
    }
  });
};

export const addPost = (req, res) => {
  const { title, description, content, category, image, is_published } =
    req.body;
  const finalImage =
    image && image.trim() !== "" ? image : "/upload/default.png";
  const query =
    "INSERT INTO posts (title, description, content, category, image, user_id, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
  db.query(
    query,
    [
      title,
      description,
      content,
      category,
      finalImage,
      req.user.id,
      is_published,
    ],
    (err, data) => {
      if (err) return res.status(403).json("Invalid Operation");
      return res
        .status(200)
        .json({ id: data.rows[0].id, message: "Post Created" });
    }
  );
};

export const deletePost = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM posts where id = $1 and user_id = $2";
  db.query(query, [id, req.user.id], (err, data) => {
    if (err) return res.status(403).json("Invalid Operation");
    return res.status(200).json("Post Deleted");
  });
};

export const updatePost = (req, res) => {
  const { title, description, content, category, image, is_published } =
    req.body;
  const finalImage =
    image && image.trim() !== "" ? image : "/upload/default.png";
  const id = req.params.id;
  const query =
    "UPDATE posts SET title = $1, description = $2, content = $3, category = $4, image = $5, is_published = $6 WHERE id = $7 AND user_id = $8";
  db.query(
    query,
    [
      title,
      description,
      content,
      category,
      finalImage,
      is_published,
      id,
      req.user.id,
    ],
    (err, data) => {
      if (err) return res.status(403).json("Invalid Operation");
      return res.status(200).json("Post Updated");
    }
  );
};

export const getUserPosts = (req, res) => {
  const query =
    "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC";
  db.query(query, [req.user.id], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    return res.status(200).json(data.rows);
  });
};
