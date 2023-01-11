import Layout from "../components/Layout"
import { getSession, signOut, useSession } from "next-auth/react"

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
      },
    }
  }

  return {
    props: { session },
  }
}

export default function Home() {
  const { data: session } = useSession()
  const user = session.user
  console.log(session)

  return (
    <Layout title="Home">
      <h1>Hello {user.name}</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  )
}
