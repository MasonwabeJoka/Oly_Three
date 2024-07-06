
'use client'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
type ParentFormValues = {
  parentField1: string;
};

type ChildFormValues = {
  childField1: string;
};

const ChildForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ChildFormValues>();

  const onSubmit: SubmitHandler<ChildFormValues> = data => {
    console.log("Child Form Data:", data);
    // Handle child form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Child Form Fields */}
      <input
        type="text"
        {...register('childField1', { required: 'This field is required' })}
      />
      {errors.childField1 && <span>{errors.childField1.message}</span>}

      {/* Child Form Submit Button */}
      <button type="submit">Submit Child Form</button>
    </form>
  );
};

const ParentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ParentFormValues>();

  const onSubmit: SubmitHandler<ParentFormValues> = data => {
    console.log("Parent Form Data:", data);
    // Handle parent form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Parent Form Fields */}
      <input
        type="text"
        {...register('parentField1', { required: 'This field is required' })}
      />
      {errors.parentField1 && <span>{errors.parentField1.message}</span>}

      {/* Parent Form Submit Button */}
      <button type="submit">Submit Parent Form</button>

      {/* Child Form */}
      <ChildForm />
    </form>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <ParentForm />
    </div>
  );
};

export default App;
