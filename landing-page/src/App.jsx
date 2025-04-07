import { Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Category Blog</h1>
      
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;