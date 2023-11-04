import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export const NewUserPage: React.FC = () => {
  const { data: session } = useSession();
  return (
    <section>
      <h1>New User</h1>
      {session && <h2>{session.user?.name}</h2>}
    </section>
  );
};

export default NewUserPage;
