import { useState } from "react";

export default function useFormValidation(valueIsValid) {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = valueIsValid(value);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = (value) => {
    setValue(value);
  };

  const onBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched("");
    setValue("");
  };

  return {
    value,
    isTouched,
    reset,
    inputChangeHandler,
    onBlurHandler,
    hasError,
    isValid,
  };
}
