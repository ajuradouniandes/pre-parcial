/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateAuthor from "../app/create/page";
import { AuthorsProvider } from "../context/AuthorsContext";

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn().mockReturnValue(null), // Simula que no hay ID en la URL por defecto
    }),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // Devuelve un array vacío de autores
    })
) as jest.Mock;

const setup = () => {
    const user = userEvent.setup();

    render(
        <AuthorsProvider>
            <CreateAuthor />
        </AuthorsProvider>
    );

    const name = screen.getByLabelText("Author name");
    const birth = screen.getByLabelText("Birth date");
    const image = screen.getByLabelText("Image URL");
    const description = screen.getByLabelText("Description");
    const button = screen.getByRole("button", { name: "Guardar" });


    return {
        user,
        name,
        birth,
        image,
        description,
        button
    };
}

const fillForm = async (user: any, name: any, birth: any) => {
    await user.type(name, "Gabriel Garcia Marquez");
    await user.type(birth, "1927-03-06");
}

describe ("Formulario Crear Autor", () => {
    test("Render inicial del formulario", () => {
        const { name, birth, image, description, button } = setup();

        expect(name).toBeInTheDocument();
        expect(birth).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(description).toBeInTheDocument();

        expect(button).toBeDisabled();
    });

    test("El botón debe estar deshabilitado si el formulario está vacío", () => {
        const { button } = setup();
        expect(button).toBeDisabled();
    });

    test("Formulario válido habilita el botón", async () => {
        const { user, name, birth, button } = setup();

        await fillForm(user, name, birth);

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();

        expect(button).toBeEnabled();

    });

});
