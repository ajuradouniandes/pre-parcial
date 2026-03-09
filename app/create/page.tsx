/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { useAuthors } from "../../context/AuthorsContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateAuthor() {
    const { authors, addAuthor, updateAuthor } = useAuthors();

    const params = useSearchParams();
    const router = useRouter();

    const id = params.get("id");

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            const author = authors.find((a: any) => a.id == id);
            if (author) {
                
                setName(author.name);
                setBirthDate(author.birthDate);
                setDescription(author.description);
                setImage(author.image);
            }
        }
    }, [id, authors]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!name || !birthDate) {
            setError("Name and BirthDate are required");
            return;
        }

        const author = {
            id: id ? Number(id) : Date.now(),
            name,
            birthDate,
            description,
            image,
            books: [],
            prizes: []
        };

        if (id) {
            updateAuthor(author);
        } else {
            addAuthor(author);
        }

        router.push("/authors");
    };

    return (
        <div className="p-6 max-w-md">

            <h1 className="text-2xl font-bold mb-4">
                {id ? "Editar Autor" : "Crear Autor"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <input
                    aria-label="Author name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2"
                />

                <input
                    type="date"
                    aria-label="Birth date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="border p-2"
                />

                <input
                    aria-label="Image URL"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2"
                />

                <textarea
                    aria-label="Description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2"
                />

                {error && (
                    <p role="alert" className="text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!name || !birthDate}
                    className="bg-blue-500 text-white py-2 rounded"
                    >
                        Guardar
                </button>
            </form>
        </div>
    );
}