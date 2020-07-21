import React, { Component } from "react";
import { formatDate } from "../utils/helpers";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown"
import DatePickerField from "../components/DatePickerField";
import { getCompanies } from "../utils/endpoints";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import UserForm from "../components/UserForm";
import { connect } from "react-redux";
import { updateUser } from "../actions/user";

class Profile extends Component {
    state = {
        companies: []
    };

    initialValues = {
        email: '',
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
            .email('Email should be valid email').required("Email is required")
    });

    attemptUpdate = (values) => {
        const payload = {
            ...values,
            companyId: Number(values.companyId),
            birthDate: formatDate(values.birthDate)
        };

        this.props.editUser(payload)
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
        let { user } = this.props;

        if (!Object.keys(user).length) {
            return (<div>Lodaing...</div>)
        }

        user = {...user, birthDate: new Date(user.birthDate) };

        return (
            <>
              {/*<UserForm attemptSubmit={this.attemptUpdate}*/}
              {/*          users={ {...this.props.users, birthDate: new Date(this.props.users.birthDate) }}*/}
              {/*          submitText="Update" />*/}
                <Formik
                    initialValues={user}
                    validateOnMount={false}
                    validationSchema={this.USER_VALIDATION_SCHEMA}
                    onSubmit={this.attemptUpdate}
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
                                    <button onClick={formik.handleSubmit}
                                            type="submit"
                                            className="btn btn-info float-right">Update</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        )
    }
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (payload) => dispatch(updateUser(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
