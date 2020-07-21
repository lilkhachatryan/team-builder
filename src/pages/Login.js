import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { Routes } from "../Router";
import { login } from "../utils/endpoints";
import { setSessionStorage } from "../utils/storage";
import {Formik, Form } from 'formik';
import * as yup from 'yup';

const Login = ({ history }) => {
    const initialValues = {
        email: '',
        password: ''
    };

    const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
        email: yup.string().email('Email should be valid email').required("Email is required"),
        password: yup.string().required("Password is required")
    });

    const attemptLogin = (values) => {
        login(values)
            .then(res => {
                if (res.status === 200) {
                    console.log('res reg', res.data);
                    setSessionStorage('token', res.data.token);
                    history.push('/home');
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={LOGIN_VALIDATION_SCHEMA}
                onSubmit={attemptLogin}
            >
                <Form>
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
                            <button type="submit"
                                    className="btn btn-info float-right">Login</button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <div className="form-group row justify-content-center">
                <div className="col-sm-10 col-md-6 d-flex align-items-center">
                    <div>Don't have account, go to</div>
                    <Link to={Routes.SignUp}>
                        <button className="btn btn-link float-right">Register</button>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default Login
