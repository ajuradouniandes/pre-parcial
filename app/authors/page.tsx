/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuthors } from "@/context/AuthorsContext";
import Link from "next/link";

export default function AuthorsPage() {
    const { authors, deleteAuthor } = useAuthors();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Autores</h1>

            <Link
                href="/create"
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Crear Autor
            </Link>

            <ul className="mt-4 space-y-3">
                {authors.map((author: any) => (
                    <li key={author.id} className="border p-4 rounded">

                        <div className="flex gap-4 items-center">
                            {/* <img
                src={author.image}
                alt={author.name}
                className="w-16 h-16 object-cover rounded"
              /> */}

                            <div>
                                <h2 className="font-bold">{author.name}</h2>
                                <p>{author.birthDate}</p>
                            </div>
                        </div>

                        <p className="mt-2">{author.description}</p>

                        <div className="flex gap-2 mt-3">
                            <Link
                                href={`/create?id=${author.id}`}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </Link>

                            <button
                                onClick={() => deleteAuthor(author.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}