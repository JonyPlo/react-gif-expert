import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe("Pruebas en <AddCategory/>", () => {
  const inputValue = "Saitama";

  test("Debe de cambiar el valor de la caja de texto", () => {
    render(<AddCategory onNewCategory={() => {}} />);
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: inputValue } });

    expect(input.value).toBe("Saitama");
  });

  test("Debe de llamar onNewCategory si el input tiene un valor ", () => {
    const onNewCategory = jest.fn(); // jest.fn() es un Mock o una simulacion de una funcion
    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole("textbox");
    const form = screen.getByRole("form"); // Aqui puedo obtener el elemento formulario porque a la etiqueta form del componente AddCategory se le agrego la propiedad aria-label="form"

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);

    expect(input.value).toBe(""); // Valido que el input se haya reseteado a "" despues de ejecutar el evento submit
    expect(onNewCategory).toHaveBeenCalled(); // Con toHaveBeenCalled valido que la funcion onNewCategory fue llamada en alguna parte
    expect(onNewCategory).toHaveBeenCalledTimes(1); // Con toHaveBeenCalledTimes valido que la funcion onNewCategory fue llamada las veces que especifiquemos en los parentesis
    expect(onNewCategory).toHaveBeenCalledWith(inputValue); // Con toHaveBeenCalledWith valido si se esta llamando a la funcion onNewCategory con sus respectivos parametros, en este caso es un solo parametro de tipo string
  });

  test("No debe de llamar a la funcion onNewCategory si el input esta vacio", () => {
    const onNewCategory = jest.fn();
    render(<AddCategory onNewCategory={onNewCategory} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(onNewCategory).toHaveBeenCalledTimes(0); // Este expect evalua lo mismo que el expect de abajo
    expect(onNewCategory).not.toHaveBeenCalled(); // Agregando .not delante de la segunda expresion podemos negar el resultado, seria algo mas o menos asi !true = false
  });
});
