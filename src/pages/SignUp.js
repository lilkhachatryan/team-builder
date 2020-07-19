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

class SignUp extends Component {
    state = {
        // fields: {
        //     email: '',
        //     password: '',
        //     firstName: 'Lil',
        //     lastName: 'Kh',
        //     birthDate: new Date(),
        //     sex: 'male',
        //     avatarUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        //     jsExperience: 2,
        //     reactExperience: 1,
        //     companyId: ''
        // },
        // fieldErrors: {},
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

    SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
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
        password: yup
            .string()
            .required("Password is required")
    });

    // onInputChange = ({ name, value, error }) => {
    //     const { fields, fieldErrors } = this.state;
    //     fields[name] = value;
    //     fieldErrors[name] = error;
    //     this.setState({ fields, fieldErrors })
    // };

    onRememberMeChange = ({ value }) => {
        this.setState({ rememberMe: value })
    };

    // onDateChange = (date) => {
    //     const { fields } = this.state;
    //     fields.birthDate = formatDate(date);
    //     this.setState({ fields })
    // };
    //
    // onSelectCompany = (e) => {
    //     const companyId = e.target.value ? e.target.value : null;
    //     this.setState({ fields: { ...this.state.fields, companyId } });
    // };

    attemptSignUp = (values) => {
        const payload = {
            ...values,
            companyId: Number(values.companyId),
            birthDate: formatDate(values.birthDate)
        };

        register(payload)
            .then(res => {
                if (res.status === 200) {
                    console.log('res reg', res.data);
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
                console.log('res', res);
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

                {/*<form>*/}
                {/*    <div className="form-group row">*/}
                {/*        <div className="col-sm-10">*/}
                {/*            <FormField value={this.state.fields.firstName}*/}
                {/*                       onChange={this.onInputChange}*/}
                {/*                       id="firstName"*/}
                {/*                       name="firstName"*/}
                {/*                       placeholder="Type your firstName" />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="form-group row">*/}
                {/*        <div className="col-sm-10">*/}
                {/*            <FormField value={this.state.fields.lastName}*/}
                {/*                       onChange={this.onInputChange}*/}
                {/*                       id="lastName"*/}
                {/*                       name="lastName"*/}
                {/*                       placeholder="Type your lastName" />*/}
                {/*        </div>*/}
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
                {/*    <fieldset className="form-group" >*/}
                {/*        <div className="row">*/}
                {/*            <legend className="col-form-label col-sm-2 pt-0">Radios</legend>*/}
                {/*            <div className="col-sm-10">*/}
                {/*                <div className="form-check d-flex">*/}
                {/*                    <FormField  value="male"*/}
                {/*                               onChange={this.onInputChange}*/}
                {/*                                checked={this.state.fields.sex === "male"}*/}
                {/*                                className="form-check-input"*/}
                {/*                                type="radio"*/}
                {/*                                name="sex"*/}
                {/*                                id="male" />*/}
                {/*                </div>*/}
                {/*                <div className="form-check d-flex">*/}
                {/*                    <FormField  value="female"*/}
                {/*                                onChange={this.onInputChange}*/}
                {/*                                checked={this.state.fields.sex === "female"}*/}
                {/*                                className="form-check-input"*/}
                {/*                                type="radio"*/}
                {/*                                name="sex"*/}
                {/*                                id="female" />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </fieldset>*/}
                {/*    <div className="form-group row">*/}
                {/*        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>*/}
                {/*        <div className="col-sm-10">*/}
                {/*            <DatePicker*/}
                {/*                onChange={this.onDateChange}*/}
                {/*                value={this.state.fields.birthDate}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="form-group row">*/}
                {/*        <label htmlFor="validationDefault04">State</label>*/}
                {/*        <select onChange={this.onSelectCompany}*/}
                {/*                value={this.state.fields.companyId || ''}*/}
                {/*                className="form-control mb-3">*/}
                {/*            <option value="">Default select</option>*/}
                {/*            {*/}
                {/*                this.state.companies.map((company, i) => (*/}
                {/*                    <option value={company.id}*/}
                {/*                            key={company.id + i}>{company.name}</option>*/}
                {/*                ))*/}
                {/*            }*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*    <div className="form-group row">*/}
                {/*        <div className="col-sm-10">*/}
                {/*            <div className="form-check d-flex">*/}
                {/*                <FormField  value={this.state.rememberMe}*/}
                {/*                            onChange={this.onRememberMeChange}*/}
                {/*                            className="form-check-input"*/}
                {/*                            type="checkbox"*/}
                {/*                            name="rememberMe"*/}
                {/*                            id="rememberMe" />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="form-group row">*/}
                {/*        <div className="col-sm-10">*/}
                {/*            <button onClick={this.onSubmit}*/}
                {/*                    type="submit" className="btn btn-info float-right">Submit</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</form>*/}
            </>
        )
    }
}

export default SignUp
