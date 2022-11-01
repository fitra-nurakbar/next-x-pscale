import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { urlMain } from '../../lib/url';
import Button from '../components/Button'
import Layout from '../components/Layout'
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const resCategories = await fetch(`${urlMain}/category`, {
    method: "GET",
  });
  const categories = await resCategories.json();


  return {
    props: {
      categories
    }
  }
}

export default function CreatePost(props) {
const [loading, setLoading] = useState(false);
// const [posts, setPosts] = useState(props.posts);
const { categories } = props;
const [fields, setFields] = useState({
  title: "",
  description: "",
  category_id: 0,
});

const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const req = await fetch(`${urlMain}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(fields),
      });
      const res = await req.json();
      router.push("/")
    } catch (err) {
      throw err;
    }
  };

  console.log(categories)

  return (
    <Layout title={"Create Post"}>
      <section className={styles.post}>
        <h1>
          NextJS <span className="text-red-500">x</span> Pscale
        </h1>
        {loading ? <h1>Loading...</h1>:
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
        </form>}
      </section>
    </Layout>
  )
}
