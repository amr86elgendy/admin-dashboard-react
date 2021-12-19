import React from 'react'
import Input from './controllers/Input';
import Textarea from './controllers/Textarea';
import Select from './controllers/Select';
import Checkbox from './controllers/Checkbox';
import Radio from './controllers/Radio';
import Upload from './controllers/Upload';

const FormControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'checkbox':
      return <Checkbox {...rest} />;
    case 'radio':
      return <Radio {...rest} />;
    case 'upload':
      return <Upload {...rest} />;
    default:
      return null;
  }
}

export default FormControl
