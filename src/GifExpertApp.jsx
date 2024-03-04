import { useState } from "react";
import { AddCategory, GifGrid } from "./components";

export const GifExpertApp = () => {
  const [categories, setCategories] = useState(["One Punch"]);

  const onNewCategory = (newCategory) => {
    const repeatedCategory = categories.find(
      (category) => category.toLowerCase() === newCategory.toLowerCase()
    );
    if (repeatedCategory) {
      alert("La categoría que intenta agregar ya existe");
      return;
    }
    setCategories([newCategory, ...categories]);
  };

  return (
    <>
      <h1>GifExpertApp</h1>
      <AddCategory onNewCategory={onNewCategory} />
      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
    </>
  );
};