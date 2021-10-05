import { useState } from "react";

//custom hook for handling form data in React
const useFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    const { value, name } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const resetFormData = () => {
    setFormData(initialState)
  }
  return [formData, handleChange, resetFormData];
}

export default useFields;
