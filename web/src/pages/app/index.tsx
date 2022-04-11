import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <h1>Hello world!</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <a href="api/auth/logout" >logout</a>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {}
    }
  }
});