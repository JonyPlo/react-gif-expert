import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe("Pruebas en el hook useFetchGifs", () => {
  test("Debe de retornar el estado inicial de images y isLoading", () => {
    const { result } = renderHook(() => useFetchGifs("One Punch")); // El metodo renderHook contiene 3 propiedades, rerender, result y unmount.La propiedad rerender es para rerenderizar el hook, result es el resultado que regresa el hook cuando se monta y unmount se dispara cuando el hook es desmontado
    const { images, isLoading } = result.current;

    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test("Debe de retornar un arreglo con objetos de imagenes y isLoading en false ", async () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));

    // Con el metodo waitFor digo que espere hasta que lo que este dentro del callback sea verdadero, en este caso hacemos que espere el resultado que devuelve el hook useFetchGifs
    await waitFor(() => {
      const resultLength = result.current.images.length;
      expect(resultLength).toBeGreaterThan(0);
    });

    const { images, isLoading } = result.current;

    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});
