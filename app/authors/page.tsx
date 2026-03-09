/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useAuthors } from "@/context/AuthorsContext";
import { useState } from "react";
import Link from "next/link";

export default function AuthorsPage() {
    const { authors, deleteAuthor } = useAuthors();
    const [search, setSearch] = useState("");

    const filteredAuthors = authors.filter((author: any) =>
        author.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">Autores</h1>

            <Link
                href="/create"
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Crear Autor
            </Link>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Buscar autor..."
                    aria-label="Buscar autor por nombre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 w-full max-w-md"
                />
            </div>

            <ul className="mt-6 space-y-3">

                {filteredAuthors.length === 0 ? (
                    <p className="text-gray-500">
                        No se encontraron coincidencias
                    </p>
                ) : (
                    filteredAuthors.map((author: any) => (
                        <li key={author.id} className="border p-4 rounded">

                            <div className="flex gap-4 items-center">

                                <img
                                    src={author.image}
                                    alt={author.name}
                                    className="w-16 h-16 rounded object-cover"
                                />

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
                    ))
                )}

            </ul>
        </div>
    );
}