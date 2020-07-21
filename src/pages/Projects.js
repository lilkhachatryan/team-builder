import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjects, voteProject } from "../actions/projects"

class Projects extends Component {
    componentDidMount() {
        this.props.getProjects()
    }

    render() {
        console.log('this.props.topics', this.props.topics);
        const { projects } = this.props;
        console.log('projects', projects);

        return (
            <>
                <ul className="list-group">
                    {

                        projects.map(item => (
                            <li className="list-group-item"
                                key={item.id}>
                                { item.title }

                                <button onClick={() => this.props.voteProject(item.id, {
                                    type: item.votedByMe ? 'unlike' : 'like'
                                })}
                                        type="submit"
                                        className="btn btn-info float-right">{ item.votedByMe ? 'UnVote': 'Vote'}</button>
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    projects: state.projects.projects
});

const mapDispatchToProps = (dispatch) => ({
    getProjects: () => dispatch(getProjects()),
    voteProject: (id, payload) => dispatch(voteProject(id, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
