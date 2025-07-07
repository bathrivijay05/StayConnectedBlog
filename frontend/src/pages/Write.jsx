import React, { useEffect, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

function Write() {
  const state = useLocation().state;
  const navigate = useNavigation();

  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [category, setCategory] = useState(state?.category || "");
  const [description, setDescription] = useState(state?.description || "");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(state?.image || "");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      // console.log(formData);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      setImageUrl(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      state
        ? await axios.put(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/posts/${state.id}`,
            {
              title,
              description,
              content,
              category,
              image: imageUrl,
            },
            { withCredentials: true }
          )
        : await axios.post(
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
      navigate("/");
    } catch (err) {
      // console.log(err);
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
              onChange={(e) => setImage(e.target.files[0])}
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
