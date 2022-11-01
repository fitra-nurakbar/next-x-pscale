import { useState } from "react";
import { urlMain } from "../../lib/url";
import styles from "../styles/Home.module.css";
import Button from "./Button";

export default function Post({ datas }) {
  const [posts, setPosts] = useState(datas.posts);
  const [loading, setLoading] = useState(false);

  async function deleteHandler(id) {
    const ask = confirm("Apakah data ini akan dihapus?");
    setLoading(true);
    if (ask) {
      const deletePost = await fetch(`${urlMain}/delete/${id}`, {
        method: "DELETE",
      });
      const res = await deletePost.json();
      setLoading(false);
      const postsFiltered = posts.filter((post) => {
        return post.id !== id && post;
      });

      setPosts(postsFiltered);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className={styles.card}>
          <h2>{post.title}</h2>
          <pre>{post.description}</pre>
          <p>Kategori : {post.category.name}</p>
          <div className={styles.option}>
            <Button
              onClick={() => {
                editPost();
              }}
              className="bg-green-500 text-white"
            >
              Edit
            </Button>
            <Button
              onClick={deleteHandler.bind(this, post.id)}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
