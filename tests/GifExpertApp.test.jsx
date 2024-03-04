import { fireEvent, render, screen } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp";

describe("Pruebas en el componente <GifExpertApp/>", () => {
  const title = "GifExpertApp";
  const initialCategory = "one punch";
  test("Debe de hacer match con el snapshot ", () => {
    const { container } = render(<GifExpertApp />);
    expect(container).toMatchSnapshot();
  });

  test("Debe de retornar el estado inicial de la categoria ", () => {
    render(<GifExpertApp />);
    expect(screen.getByText(initialCategory));
  });

  test("El titulo debe de ser GifExpertApp", () => {
    render(<GifExpertApp />);
    expect(screen.getByText(title));
  });

  test("Debe de ejecutar el alert si la categoria agregada esta repetida", () => {
    window.alert = jest.fn(); // Transformo el alert del navegador a un mock ya que el alert no esta integrado en el jsdom de jest
    render(<GifExpertApp />);
    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: initialCategory } });
    fireEvent.submit(form);

    expect(window.alert).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "La categoría que intenta agregar ya existe"
    );
  });

  test("No debe de ejecutar el alert si la categoria no esta repetida", () => {
    window.alert = jest.fn();

    render(<GifExpertApp />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: "dragon ball" } });
    fireEvent.submit(form);

    expect(window.alert).not.toHaveBeenCalled();
  });

  test("Debe de agregar una categoria nueva en el arreglo", () => {
    render(<GifExpertApp />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form");

    fireEvent.input(input, { target: { value: "dragon ball" } });
    fireEvent.submit(form);

    const arrayCategories = screen.getAllByRole("heading", { level: 3 });

    expect(arrayCategories.length).toBeGreaterThan(1)
  });
});
