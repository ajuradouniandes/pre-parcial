/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React ,{ createContext, useContext, useEffect, useState } from "react";

export const AuthorsContext = createContext<any>(null);

export function AuthorsProvider({ children }: any) {
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
        const loadAuthors = async () => {
            const res = await fetch("/authors.json");
            const data = await res.json();
            setAuthors(data);
        };

        loadAuthors();
    }, []);

    const addAuthor = (author: any) => {
        setAuthors((prev: any) => [...prev, author]);
    };

    const deleteAuthor = (id: number) => {
        setAuthors((prev: any) => prev.filter((a: any) => a.id !== id));
    };

    const updateAuthor = (updated: any) => {
        setAuthors((prev: any) =>
            prev.map((a: any) => (a.id === updated.id ? updated : a))
        );
    };

    return (
        <AuthorsContext.Provider
            value={{ authors, addAuthor, deleteAuthor, updateAuthor }}
        >
            {children}
        </AuthorsContext.Provider>
    );
}

export const useAuthors = () => useContext(AuthorsContext);