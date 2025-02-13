import { useRef } from "react";

export function useFormHandler() {
  const formRef = useRef(null);

  // Function to get form values
  const getValues = () => {
    if (!formRef.current) return {};
    const form = new FormData(formRef.current);
    return Object.fromEntries(form.entries());
  };

  // Function to set values in the form
  const setValues = (data) => {
    if (!formRef.current) return;
    
    if (Array.isArray(data) && data.length > 0) {
      const obj = data[0]; // Get the first object from the array
      Object.keys(obj).forEach((key) => {
        const input = formRef.current.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = obj[key];
        }
      });
    }
  };

  return { formRef, getValues, setValues };
}
