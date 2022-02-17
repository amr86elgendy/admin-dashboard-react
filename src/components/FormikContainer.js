import { Formik, Form } from 'formik';
import { ImSpinner8 } from 'react-icons/im';

const FormikContainer = ({
  initialValues,
  onSubmit,
  validate,
  isLoading,
  title,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <h2 className='mb-8 tracking-widest uppercase text-[#8094ae]'>
              {title}
            </h2>
            <div className='grid grid-cols-6 gap-6 mb-8'>{children}</div>
            <button className='!px-4 btn' type='submit'>
              {isLoading ? <ImSpinner8 className='mx-1 text-xl animate-spin' /> : 'save'}
            </button>
          </Form>
        );}}
    </Formik>
  );
};

export default FormikContainer;
