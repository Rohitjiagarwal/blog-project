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
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
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
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h2>{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogList;