import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn("email", { email, callbackUrl: "/profile" });
    } catch (e) {
      setError(e as string);
    }
  };

  return (
    <section className="prose">
      <h2>Login Page</h2>
      <form
        className="flex flex-col max-w-xl gap-4 p-6 border-2 border-black rounded-md"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase">Email</label>
          <input
            required
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <div>
          <button
            type="submit"
            className="px-4 py-1 text-white rounded-md bg-slate-700"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
