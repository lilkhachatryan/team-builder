import React from "react";
import PropTypes from "prop-types"
import { Field, ErrorMessage } from "formik";

const Dropdown = ({
                   name,
                   className,
                   label,
                   options,
                   ...rest
               }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Field
                as="select"
                name={name}
                className={className || "form-control"}
                {...rest}>
                <option value="">Default select</option>
                {
                    options.map((item, i) => (
                        <option value={item.id}
                                key={item.id + i}>{item.name}</option>
                    ))
                }
            </Field>
            <ErrorMessage component="div"
                          name={name}
                          className="text-error"/>
        </>
    )
};

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Dropdown;
