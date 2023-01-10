import { useCallback, useState } from "react";

const useInput = (validate) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isValid = validate(input);
  const hasError = !isValid && isFocused;

  const inputChangeHandler = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const inputOnBlurHandler = useCallback(() => {
    setIsFocused(true);
  }, []);

  const resetInput = useCallback(() => {
    setInput("");
    setIsFocused(false);
  }, []);

  return {
    value: input,
    hasError,
    isValid,
    isFocused,
    inputChangeHandler,
    inputOnBlurHandler,
    resetInput,
  };
};

export default useInput;
