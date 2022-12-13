import Link from "next/link";
import { useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";

export default function Home() {
  const [text, setText] = useState({
    username: ''
  })

  const inputHandler = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    setText({...text, [name]: value})
  }

  const submitHandler = () => {
    console.log(text)
  }

  return (
    <Layout title={"Home"}>
      <section className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
        <div className="border rounded-md p-5 flex flex-col items-center justify-center">
          <h1 className="font-semibold text-lg">{text.username}</h1>
          <input type="text" name="username" onChange={inputHandler.bind(this)} placeholder="Username" className="shadow-md border p-[15px] my-5" />
          <div className="flex flex-col justify-center items-center gap-2">
            <Button onClick={submitHandler.bind(this)}>Login</Button>
            <Link href={"/auth/register"}>
            <Button>Register</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
