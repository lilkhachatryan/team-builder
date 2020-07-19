import React from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import DatePicker from 'react-date-picker';

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <div className="d-flex flex-column">
            <label htmlFor={props.name}>{props.label}</label>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || ''}
                onChange={val => {
                    setFieldValue(field.name, val);
                }}
            />
            <ErrorMessage component="div"
                          name={props.name}
                          className="text-error"/>
         </div>
    );
};

export default DatePickerField
