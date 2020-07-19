import React, { Component } from "react";
import { formatDate } from "../utils/helpers";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown"
import DatePickerField from "../components/DatePickerField";
import { getCompanies } from "../utils/endpoints";
import { Formik, Form } from 'formik';
import * as yup from 'yup';

class UserForm extends Component {
    state = {
        companies: [],
        rememberMe: false
    };

    initialValues = {
        email: '',
        password: '',
        firstName: 'Lil',
        lastName: 'Kh',
        birthDate: new Date(),
        sex: 'male',
        avatarUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        jsExperience: 0,
        reactExperience: 0,
        companyId: ''
    };

    USER_VALIDATION_SCHEMA = yup.object().shape({
        fistName: yup
            .string()
            .required("First name is required"),
        lastName: yup
            .string()
            .required("Last name is required"),
        birthDate: yup
            .date()
            .min(new Date(1900, 0, 1))
            .required("Birth date is required"),
        sex: yup
            .mixed()
            .oneOf(['male', 'female']),
        avatarUrl: yup
            .string()
            .required("Avatar is required"),
        jsExperience: yup
            .number()
            .required("JS experience is required"),
        reactExperience: yup
            .number()
            .required("React experience is required"),
        companyId: yup
            .number()
            .required("Company is required"),
        email: yup
            .string()
            .email('Email should be valid email').required("Email is required"),
        // password: this.props.isCreate ? yup
        //     .string()
        //     .required("Password is required") : yup
        //     .string(),
    });

    componentDidMount() {
        this.getCompaniesFromServer()
    }

    getCompaniesFromServer = () => {
        getCompanies()
            .then(res => {
                console.log('res', res);
                this.setState({ companies: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    };

    onSubmit = (values) => {
        const payload = {
            ...values,
            companyId: Number(values.companyId),
            birthDate: formatDate(values.birthDate)
        };
        console.log('aaaaaa');
        this.props.attemptSubmit(payload)
    };

    render() {
        return (
            <>
                <Formik
                    initialValues={this.props.user || this.initialValues}
                    validationSchema={this.USER_VALIDATION_SCHEMA}
                    onSubmit={this.onSubmit}
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="firstName"
                                           label="First name"
                                           placeholder="Enter first name" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="lastName"
                                           label="Last name"
                                           placeholder="Enter Last name" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <DatePickerField name="birthDate"
                                                     id="birthDate"
                                                     label="Birth date" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <div className="form-check d-flex">
                                        <Input id="male"
                                               label="Male"
                                               type="radio"
                                               value="male"
                                               name='sex'
                                               checked={formik.values.sex === 'male'} />
                                    </div>
                                    <div className="form-check d-flex">
                                        <Input value="female"
                                               label="Female"
                                               type="radio"
                                               name="sex"
                                               id="female"
                                               checked={formik.values.sex === 'female'}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="email"
                                           label="Email"
                                           placeholder="Enter Email" />
                                </div>
                            </div>

                            {this.props.isCreate &&
                                <div className="form-group row justify-content-center">
                                    <div className="col-sm-10 col-md-6">
                                        <Input name="password"
                                               label="Password"
                                               type="password"
                                               placeholder="Enter password" />
                                    </div>
                                </div>
                            }
                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Dropdown name="companyId"
                                              label="Company"
                                              options={this.state.companies}/>
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <button onClick={formik.handleSubmit}
                                            type="submit"
                                            className="btn btn-info float-right">{this.props.submitText}</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        )
    }
}

export default UserForm
