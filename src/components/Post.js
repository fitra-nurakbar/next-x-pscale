import styles from "../styles/Home.module.css";
import Button from "./Button";

export default function Post(props) {
  const { editPost, deletePost } = props

  return (
    <div className={styles.card}>
      <h2>Title</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minima
        consequatur deserunt sapiente eius ullam rerum harum officia quod
        adipisci corrupti reprehenderit optio, dolorem nulla quidem perspiciatis
        quae at modi!
      </p>
      <div className={styles.option}>
        <Button onClick={() => {editPost()}} className="bg-green-500 text-white">
          Edit
        </Button>
        <Button onClick={() => {deletePost()}} className="bg-red-500 text-white">
          Delete
        </Button>
      </div>
    </div>
  );
}
