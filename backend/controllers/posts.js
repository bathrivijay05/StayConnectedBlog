import db from "../db.js";

export const getPosts = (req, res) => {
  const query = req.query.category
    ? "SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC"
    : "SELECT * FROM posts ORDER BY created_at DESC";
  db.query(query, [req.query.category], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (req.query.category && data.length == 0)
      return res.status(404).json("Not Found");
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const query =
    "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?;";
  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    if (data.length === 0) return res.status(404).json("Post not found.");
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const { title, description, content, category, image } = req.body;
  const finalImage =
    image && image.trim() !== "" ? image : "/upload/default.png";
  const query =
    "INSERT INTO posts (title, description, content, category, image, user_id, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [title, description, content, category, finalImage, req.user.id, 1],
    (err, data) => {
      if (err) return res.status(403).json("Invalid Operation");
      return res
        .status(200)
        .json({ id: data.insertId, message: "Post Created" });
    }
  );
};

export const deletePost = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM posts where id = ? and user_id = ?";
  db.query(query, [id, req.user.id], (err, data) => {
    if (err) return res.status(403).json("Invalid Operation");
    return res.status(200).json("Post Deleted");
  });
};

export const updatePost = (req, res) => {
  const { title, description, content, category, image } = req.body;
  const finalImage =
    image && image.trim() !== "" ? image : "/upload/default.png";
  const id = req.params.id;
  const query =
    "UPDATE posts SET title = ?, description = ?, content = ?, category = ?, image = ? WHERE id = ? AND user_id = ?";
  db.query(
    query,
    [title, description, content, category, finalImage, id, req.user.id],
    (err, data) => {
      if (err) return res.status(403).json("Invalid Operation");
      return res.status(200).json("Post Updated");
    }
  );
};
