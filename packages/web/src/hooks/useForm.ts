import { useState, ChangeEvent } from 'react';

interface FormValues {
  [key: string]: any;
}

interface UseFormProps<T extends FormValues> {
  onSubmit: (values: T) => void;
  initialValues: T;
}

function useForm<T extends FormValues>({
  initialValues,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
