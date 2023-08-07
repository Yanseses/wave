import { ChangeEvent, useCallback, useState } from "react"

export const useForm = (inputValues: any) => {
  const [ values, setValues ] = useState(inputValues);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({...values, [name]: { ...values[name], data: value }})
  }, [values]);

  const handleError = useCallback(({ name, status }: any) => {
    setValues({ ...values, [name]: { ...values[name], error: status } })
  }, [values])

  return { values, handleChange, handleError }
}