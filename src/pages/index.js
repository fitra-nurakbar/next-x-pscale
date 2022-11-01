import { useRouter } from "next/router";
import { useState } from "react";
import { urlMain } from "../../lib/url";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const resCategories = await fetch(`${urlMain}/category`, {
    method: "GET",
  });
  const categories = await resCategories.json();
  const resPosts = await fetch(urlMain, {
    method: "GET",
  });
  const posts = await resPosts.json();

  if (categories.success === false || posts.success === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      categories,
    },
  };
}

export default function Home(props) {
  // const { posts } = props
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(props.posts);
  const { categories } = props;
  const [fields, setFields] = useState({
    title: "",
    description: "",
    category_id: 0,
  });

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const req = await fetch(`${urlMain}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(fields),
      });
      const res = await req.json();

      e.target.reset();
      setLoading(false);
      const postsFiltered = posts.filter((post) => {
        return post.id !== res.id && post;
      });

      setPosts(postsFiltered);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Layout title={"Home"}>
      <section className={styles.post}>
        <h1>
          NextJS <span className="text-red-500">x</span> Pscale
        </h1>
        <form onSubmit={submitHandler.bind(this)}>
          <label htmlFor="title">Title :</label>
          <input
            required
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
            type="text"
            id="title"
            placeholder="Title disini guys!!!"
          />
          <label htmlFor="description">Description :</label>
          <textarea
            required
            cols={10}
            id="description"
            placeholder="Description content disini guys!!!"
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
          />
          <label htmlFor="category">Category :</label>
          <select
            required
            defaultValue={"DEFAULT"}
            id="category"
            onChange={(e) =>
              setFields({ ...fields, category_id: e.target.value })
            }
          >
            <option value={"DEFAULT"} disabled>
              Select category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <Button type="submit">Post</Button>
        </form>
        {posts.success === false ? (
          <h1>Posts does&apos;nt</h1>
        ) : 
          <Post datas={{ ...props }} />
        }
      </section>
    </Layout>
  );
}
