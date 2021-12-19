import { Formik, Form } from 'formik';

const FormikContainer = ({
  initialValues,
  onSubmit,
  validate,
  title,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form>
          <h2 className='mb-8 tracking-widest uppercase text-[#8094ae]'>
            {title}
          </h2>
          <div className='grid grid-cols-6 gap-6 mb-8'>{children}</div>
          
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
