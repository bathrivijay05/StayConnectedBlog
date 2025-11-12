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

  const handleSubmit = async (e) => {
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
          },
          { withCredentials: true }
        );
        // Navigate to the updated article
        navigate(`/article/${state.id}`);
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
          },
          { withCredentials: true }
        );
        // Navigate to the newly created article
        if (response.data && response.data.id) {
          navigate(`/article/${response.data.id}`);
        } else {
          navigate("/");
        }
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
          required
          type="text"
          name="title"
          placeholder="Enter or edit article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          required
          type="text"
          name="description"
          placeholder="Enter or edit article description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ReactQuill
          className="editor"
          theme="snow"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="right">
        <div className="right-card">
          <h3>Publish</h3>
          {state && (
            <p>
              Status: Published on {moment(state?.created_at).format("llll")}
            </p>
          )}
          {!state && <p>Status: Not Published</p>}
          <div className="right-card-div">
            {/* <button className="button">Save as a draft</button> */}
            <button className="button primary" onClick={handleSubmit}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <div className="right-card">
          <h3>Categories</h3>
          <div className="category-list">
            <input
              type="checkbox"
              id="category1"
              name="category"
              value="India"
              checked={category === "India"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="category1">India</label>
            <br />
            <input
              type="checkbox"
              id="category2"
              name="category"
              value="World"
              checked={category === "World"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="category2">World</label>
            <br />
            <input
              type="checkbox"
              id="category3"
              name="category"
              value="Business"
              checked={category === "Business"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="category3">Business</label>
            <br />
            <input
              type="checkbox"
              id="category4"
              name="category"
              value="Technology"
              checked={category === "Technology"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="category4">Technology</label>
            <br />
            <input
              type="checkbox"
              id="category5"
              name="category"
              value="Sports"
              checked={category === "Sports"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="category5">Sports</label>
            <br />
          </div>
        </div>
        <div className="right-card">
          <h3>Upload Image</h3>
          <input
            type="text"
            name="imageurl"
            id="imageurl"
            accept="image/*"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="image-upload-container">
            <input
              id="file"
              type="file"
              name="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Validate file type on selection
                  const allowedTypes = [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                    "image/svg+xml",
                  ];
                  if (!allowedTypes.includes(file.type)) {
                    alert("Invalid file type! Please select an image file.");
                    e.target.value = "";
                    setImage(null);
                    return;
                  }
                  setImage(file);
                }
              }}
            />
            <button className="button" onClick={uploadImage}>
              Upload
            </button>
          </div>
          <div className="image-container">
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
