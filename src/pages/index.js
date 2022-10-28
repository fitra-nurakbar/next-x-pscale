import Button from "../components/Button";
import Layout from "../components/Layout";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";

export default function Home() {
  
  return (
    <Layout title={"Home"}>
      <section className={styles.post}>
        <h1>
          NextJS <span className="text-red-500">x</span> Pscale
        </h1>
        <form>
          <label htmlFor="title">Title :</label>
          <input type="text" id="title" placeholder="Title disini guys!!!" />
          <label htmlFor="description">Description :</label>
          <textarea
            cols={10}
            id="description"
            placeholder="Description content disini guys!!!"
          />
          <Button type="submit">Post</Button>
        </form>
        <Post editPost={function test() {console.log("test")}} deletePost={(e) => {console.log()}} />
      </section>
    </Layout>
  );
}
