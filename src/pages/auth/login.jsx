import { getProviders, getSession, signIn } from "next-auth/react"
import Layout from "../../components/Layout"

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const providers = await getProviders()

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { providers },
  }
}

export default function Component({ providers }) {
  // console.log(providers)

  return (
    <Layout title={"Login"}>
      <h1>Not signed in</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>
  )
}
