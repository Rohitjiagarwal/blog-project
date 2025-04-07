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
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>{blog.title}</h1>
      <img
        src={blog.imageUrl}
        alt={blog.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{blog.content}</p>
      <small>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</small>
    </div>
  );
}

export default BlogDetail;