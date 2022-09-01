import { useState } from "react";

export const AddCategory = ({ onAddCategory }) => {
  const [inputValue, setInputValue] = useState("One Punch");

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const inputValueTrim = inputValue.trim();
    if (inputValueTrim.length <= 1) return;
    onAddCategory(inputValueTrim);
    setInputValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Buscar Gif'
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};
