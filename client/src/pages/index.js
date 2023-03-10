import CommentList from "@/components/CommentList";
import CreateComment from "@/components/CreateComment";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts(res.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/post", { title });
    setTitle("");
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div>
        <h1>Create Post</h1>
        <form onSubmit={onSubmit} style={{ margin: "10px" }}>
          <div className="form-group">
            <div style={{ marginBottom: "5px" }}>
              <label>Title</label>
            </div>
            <input
              style={{ marginBottom: "10px" }}
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
      <hr />

      <div>
        <h3>List of Posts</h3>
        <div style={{ display: "flex" }}>
          {posts &&
            Object.values(posts).map((post) => (
              <div
                key={post.id}
                style={{
                  width: "300px",
                  backgroundColor: "gray",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "5px",
                }}
              >
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CreateComment postId={post.id} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
