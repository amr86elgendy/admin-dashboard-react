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
      isInitialValid
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        console.log(onSubmit);
        return (
        <Form>
          <h2 className='mb-8 tracking-widest uppercase text-[#8094ae]'>
            {title}
          </h2>
          <div className='grid grid-cols-6 gap-6 mb-8'>{children}</div>
        </Form>
      )}}
    </Formik>
  );
};

export default FormikContainer;
