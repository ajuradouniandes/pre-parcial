import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      
      <h1 className="text-3xl font-bold">
        Bookstore
      </h1>

      <Link
        href="/createAuthor.tsx"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Ver Autores
      </Link>

    </main>
  );
}