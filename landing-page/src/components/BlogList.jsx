import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff", // White background for the page
        padding: "20px", // Add some padding around the container
        minHeight: "100vh", // Ensure it takes full height
        width: "100vw", // Full viewport width
        boxSizing: "border-box", // Ensure padding doesn’t add to width
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Keeps cards side by side
          gap: "20px", // Space between cards
          width: "100%", // Full width of the parent container
          // Removed maxWidth to allow full stretch
          padding: "0 20px", // Add some horizontal padding to avoid cards touching the edges
          boxSizing: "border-box",
        }}
      >
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.id}`}
            key={blog.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#333333", // Dark gray card background
                color: "#ffffff", // White text for contrast
                borderRadius: "10px", // Rounded corners
                padding: "15px", // Inner padding
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
                transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)"; // Slight zoom on hover
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)"; // Enhanced shadow
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset scale
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Reset shadow
              }}
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0", // Rounded top corners
                }}
              />
              <h2
                style={{
                  fontSize: "1.5rem",
                  margin: "10px 0",
                  fontWeight: "bold",
                }}
              >
                {blog.title}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  margin: "0 0 10px",
                  color: "#cccccc", // Light gray for snippet text
                }}
              >
                {blog.content.substring(0, 100)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;