import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const Header: React.FC = () => {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between px-4 py-6 text-white bg-slate-900">
      <Link href="/">
        <h1 className="text-2xl">Next Auth MongoDB</h1>
      </Link>
      <nav className="flex gap-3">
        {session ? <p>Hello, {session.user?.email}</p> : null}
        <ul className="flex gap-3">
          {session ? (
            <>
              <li>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </button>
              </li>
              <li>
                <Link href="/profile">My Profile</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
