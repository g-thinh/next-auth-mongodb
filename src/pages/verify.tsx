import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const VerifyPage = () => {
  return (
    <section>
      <h1>Check your email</h1>
      <p>A sign in link has been sent to your email address.</p>
    </section>
  );
};

export default VerifyPage;
