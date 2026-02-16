import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContextObject";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { logout } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await api.put(`/posts/${editingId}`, { title, content });
        alert("Post updated!");
        setEditingId(null);
      } else {
        // Create
        await api.post("/posts", { title, content });
        alert("Post created!");
      }
      
      setTitle("");
      setContent("");
      fetchPosts(); // Refresh list
    } catch (error) {
      alert("Failed to save post. " + (error.response?.data?.message || ""));
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (error) {
      alert("Failed to delete. " + (error.response?.data?.message || ""));
    }
  };

  const cancelEdit = () => {
      setEditingId(null);
      setTitle("");
      setContent("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Mini Blog</h1>
        <button onClick={logout} style={{ background: "red", color: "white", padding: "5px 10px" }}>Logout</button>
      </div>

      <hr />

      {/* Form */}
      <div style={{ marginBottom: "30px", padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h3>{editingId ? "Edit Post" : "Create New Post"}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <input 
              type="text" 
              placeholder="Post Title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <textarea 
              placeholder="Post Content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%", padding: "8px", height: "100px" }}
              required
            />
          </div>
          <button type="submit" style={{ padding: "8px 16px", background: "blue", color: "white", marginRight: "10px" }}>
            {editingId ? "Update" : "Post"}
          </button>
          {editingId && (
              <button type="button" onClick={cancelEdit} style={{ padding: "8px 16px", background: "gray", color: "white" }}>
                Cancel
              </button>
          )}
        </form>
      </div>

      {/* List */}
      <div>
        <h3>All Posts</h3>
        {posts.map(post => (
          <div key={post.id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}>
            <h4 style={{ margin: "0 0 10px 0" }}>{post.title}</h4>
            <p style={{ margin: "0 0 10px 0", color: "#555" }}>{post.content}</p>
            <small style={{ color: "#999" }}>By: {post.author} | {new Date(post.created_at).toLocaleString()}</small>
            
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => handleEdit(post)} style={{ marginRight: "10px", background: "orange", border: "none", padding: "5px 10px", cursor: "pointer" }}>Edit</button>
              <button onClick={() => handleDelete(post.id)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
