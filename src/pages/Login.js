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
            {/*<form>*/}
            {/*    <div className="form-group row">*/}
            {/*        /!*<input value={values.email}*!/*/}
            {/*        /!*       onChange={handleChange}*!/*/}
            {/*        /!*       onBlur={handleBlur}*!/*/}
            {/*        /!*       className={`form-control ${touched.email ? 'is-invalid' : ''}`}*!/*/}
            {/*        /!*       type="text"*!/*/}
            {/*        /!*       name="email"*!/*/}
            {/*        /!*       id="email" />*!/*/}
            {/*        /!*<div className="text-error">{ touched.email ? errors.email : undefined }</div>*!/*/}
            {/*    </div>*/}

            {/*    <div className="form-group row">*/}
            {/*        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>*/}
            {/*        <div className="col-sm-10">*/}
            {/*            <FormField value={this.state.fields.email}*/}
            {/*                       onChange={this.onInputChange}*/}
            {/*                       type="email"*/}
            {/*                       id="inputEmail"*/}
            {/*                       name="email"*/}
            {/*                       placeholder="Type your email" />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="form-group row">*/}
            {/*        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>*/}
            {/*        <div className="col-sm-10">*/}
            {/*            <FormField value={this.state.fields.password}*/}
            {/*                       onChange={this.onInputChange}*/}
            {/*                       type="password"*/}
            {/*                       id="password"*/}
            {/*                       name="password"*/}
            {/*                       placeholder="Type your password" />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="form-group row">*/}
            {/*        <div className="col-sm-2">Checkbox</div>*/}
            {/*        <div className="col-sm-10">*/}
            {/*            <div className="form-check">*/}
            {/*                <input className="form-check-input" type="checkbox" id="gridCheck1" />*/}
            {/*                <label className="form-check-label" htmlFor="gridCheck1">*/}
            {/*                    Example checkbox*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="form-group row">*/}
            {/*        <div className="col-sm-10">*/}
            {/*            <button onClick={handleSubmit}*/}
            {/*                    disabled={!isValid}*/}
            {/*                    type="submit" className="btn btn-info float-right">Submit</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </>
    )
};

export default Login
