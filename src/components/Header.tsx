import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-6 text-white bg-slate-900">
      <Link href="/">
        <h1 className="text-2xl">Next Auth MongoDB</h1>
      </Link>
      <nav className="flex gap-3">
        <ul>
          <li>
            <Link
              href="/login"
              className="px-3 py-2 text-black rounded-md bg-slate-50 hover:bg-slate-200 active:bg-slate-100"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
