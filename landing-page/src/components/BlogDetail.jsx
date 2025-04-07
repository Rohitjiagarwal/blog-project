import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such blog!");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: "#ffffff", // White background
        minHeight: "100vh", // Full height
        padding: "20px", // Padding around content
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#f5f5f5", // Light gray container for contrast
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "15px" }}>{blog.title}</h1>
        <img
          src={blog.imageUrl}
          alt={blog.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{blog.content}</p>
        <small style={{ color: "#666", display: "block", marginTop: "10px" }}>
          Posted on: {new Date(blog.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
}

export default BlogDetail;