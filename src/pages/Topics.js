import React, { Component } from "react";
import { connect } from "react-redux";
import { getTopics, deleteTopic, voteTopic, addTopic } from "../actions/topics"
import Input from "../components/Input";
import {Form, Formik} from "formik";
import * as yup from "yup";

class Topics extends Component {
    initialValues = {
        title: ''
    };

    TOPIC_VALIDATION_SCHEMA = yup.object().shape({
        title: yup
            .string()
            .required("Topic title is required")
    });

    componentDidMount() {
        this.props.getTopics()
    }

    attemptAdd = (values) => {
        this.props.addTopic(values);
    };

    render() {
        console.log('this.props.topics', this.props.topics);
        const { topics } = this.props;

        return (
            <>
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={this.TOPIC_VALIDATION_SCHEMA}
                    onSubmit={this.attemptAdd}
                >
                    <Form>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-10 col-md-6">
                                <Input name="title" type="text"/>
                            </div>
                            <div className="col-sm-10 col-md-6">
                                <button type="submit"
                                        className="btn btn-info float-right mt-3">Add</button>
                            </div>
                        </div>
                    </Form>
                </Formik>

                <ul className="list-group">
                    {

                        topics.map(item => (
                            <li className="list-group-item"
                                key={item.id}>
                                { item.title }

                                <button onClick={() => this.props.voteTopic(item.id, {
                                    type: item.votedByMe ? 'unlike' : 'like'
                                })}
                                        type="submit"
                                        className="btn btn-info float-right">{ item.votedByMe ? 'UnVote': 'Vote'}</button>

                                {
                                    item.canDelete && <button onClick={() => this.props.deleteTopic(item.id)}
                                                              type="submit"
                                                              className="btn btn-info float-right">Delete</button>
                                }
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    topics: state.topics.topics
});

const mapDispatchToProps = (dispatch) => ({
    getTopics: () => dispatch(getTopics()),
    deleteTopic: (id) => dispatch(deleteTopic(id)),
    voteTopic: (id, payload) => dispatch(voteTopic(id, payload)),
    addTopic: (payload) => dispatch(addTopic(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
