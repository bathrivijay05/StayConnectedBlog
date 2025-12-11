import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

function Write() {
  const state = useLocation().state;
  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [category, setCategory] = useState(state?.category || "");
  const [description, setDescription] = useState(state?.description || "");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(state?.image || "");

  // Reset form when navigating between edit and create
  useEffect(() => {
    if (state) {
      setTitle(state.title || "");
      setContent(state.content || "");
      setCategory(state.category || "");
      setDescription(state.description || "");
      setImageUrl(state.image || "");
    } else {
      // Clear form when creating new post
      setTitle("");
      setContent("");
      setCategory("");
      setDescription("");
      setImageUrl("");
      setImage(null);
    }
  }, [state]);

  const uploadImage = async () => {
    // Validation: Check if file is selected
    if (!image) {
      alert("Please select an image file to upload.");
      return;
    }

    // Validation: Check if file is an image
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const fileExtension = image.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert(
        "Invalid file type! Please upload an image file (jpg, jpeg, png, gif, webp, svg)."
      );
      setImage(null);
      return;
    }

    // Validation: Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (image.size > maxSize) {
      alert("File size too large! Please upload an image smaller than 5MB.");
      setImage(null);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      setImageUrl(res.data);
      setImage(null); // Clear the file input after successful upload
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to upload image. Please try again.";
      alert(errorMessage);
      setImage(null);
    }
  };

  const handleSubmit = async (e, isPublished) => {
    e.preventDefault();

    // Validation: Title is required
    if (!title || title.trim() === "") {
      alert("Title is required! Please enter a title for your article.");
      return;
    }

    try {
      let response;
      if (state) {
        // Update existing post
        response = await axios.put(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/${state.id}`,
          {
            title,
            description,
            content,
            category,
            image: imageUrl,
            is_published: isPublished,
          },
          { withCredentials: true }
        );
        // Navigate to the dashboard
        navigate("/dashboard");
      } else {
        // Create new post
        response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/`,
          {
            title,
            description,
            content,
            category,
            image: imageUrl,
            is_published: isPublished,
          },
          { withCredentials: true }
        );
        // Navigate to the dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error publishing article:", err);
      alert("Failed to publish article. Please try again.");
    }
  };

  return (
    <div className="editor-container">
      <div className="left">
        <input
          id="title"
          required
          type="text"
          name="title"
          placeholder="Enter or edit article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
      <div className="right">
        <div className="item">
          <h1>Description</h1>
          <textarea
            className="description-box"
            placeholder="Enter or edit article description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #e7e7e7",
              borderRadius: "5px",
              resize: "vertical",
            }}
          />
        </div>
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> {state?.is_published ? "Published" : "Draft"}
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div className="file">
            <label htmlFor="file">Upload Image</label>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && <span>{image.name}</span>}
            {image && <button onClick={uploadImage}>Upload Now</button>}
          </div>
          {imageUrl && (
            <div className="file">
              <img src={imageUrl} alt="" style={{ width: "100%" }} />
            </div>
          )}
          <div className="buttons">
            <button className="save" onClick={(e) => handleSubmit(e, false)}>
              Save as a draft
            </button>
            <button className="publish" onClick={(e) => handleSubmit(e, true)}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={category === "India"}
              name="cat"
              value="India"
              id="india"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="india">India</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "World"}
              name="cat"
              value="World"
              id="world"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="world">World</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "Technology"}
              name="cat"
              value="Technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "Sports"}
              name="cat"
              value="Sports"
              id="sports"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="sports">Sports</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "Business"}
              name="cat"
              value="Business"
              id="business"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="business">Business</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
