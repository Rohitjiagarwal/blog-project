import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import uploadImage from "../cloudinary";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function BlogAdmin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const imageUrl = await uploadImage(image);
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        imageUrl,
        createdAt: new Date().toISOString(),
        authorId: auth.currentUser.uid, // Store the author's ID
      });
      alert("Blog created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Create a Blog</h1>
        <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default BlogAdmin;