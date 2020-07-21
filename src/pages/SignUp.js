import React, { Component } from "react";
import { formatDate } from "../utils/helpers";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown"
import DatePickerField from "../components/DatePickerField";
import { getCompanies, register } from "../utils/endpoints";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {Link} from "react-router-dom";
import {Routes} from "../Router";
import { notifySuccess } from "../plugins/notify";

class SignUp extends Component {
    state = {
        companies: [],
        rememberMe: false
    };

    initialValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: new Date(),
        sex: 'male',
        avatarUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        jsExperience: 0,
        reactExperience: 0,
        companyId: ''
    };

    SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
        firstName: yup
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
        password: yup
            .string()
            .required("Password is required")
    });

    onRememberMeChange = ({ value }) => {
        this.setState({ rememberMe: value })
    };

    attemptSignUp = (values) => {
        const payload = {
            ...values,
            companyId: Number(values.companyId),
            birthDate: formatDate(values.birthDate)
        };

        register(payload)
            .then(res => {
                if (res.status === 200) {
                    notifySuccess('Sign up completed successfully');
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    componentDidMount() {
        this.getCompaniesFromServer()
    }

    getCompaniesFromServer = () => {
        getCompanies()
            .then(res => {
                this.setState({ companies: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        return (
            <>
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={this.SIGNUP_VALIDATION_SCHEMA}
                    onSubmit={this.attemptSignUp}
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
                                               checked={formik.values.sex=== "male"} />
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

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="password"
                                           label="Password"
                                           type="password"
                                           placeholder="Enter password" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="jsExperience"
                                           label="JS experience"
                                           type="number"
                                           placeholder="Enter your JS experience in month" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Input name="reactExperience"
                                           label="React experience"
                                           type="number"
                                           placeholder="Enter your React experience in month" />
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <Dropdown name="companyId"
                                              label="Company"
                                              options={this.state.companies}/>
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <div className="form-check">
                                        <input value={this.state.rememberMe}
                                               onChange={this.onRememberMeChange}
                                               type="checkbox"
                                               name="rememberMe"
                                               id="rememberMe"
                                               aria-label="..." />
                                        <label htmlFor="rememberMe"
                                               className="form-check-label">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row justify-content-center">
                                <div className="col-sm-10 col-md-6">
                                    <button onClick={formik.handleSubmit}
                                            type="submit"
                                            className="btn btn-info float-right">Sign up</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10 col-md-6 d-flex align-items-center">
                        <div>Already have account, go to</div>
                        <Link to={Routes.Login}>
                            <button className="btn btn-link float-right">Login</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default SignUp
