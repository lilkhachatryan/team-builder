import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Routes } from "../Router";
import { removeSessionStorage } from "../utils/storage"

class Header extends Component {
    state = {
        isMobile: null,
        isOpen: false,
        sources: [],
        show: false,
        search: ''
    };

    attemptLogout = () => {
        this.props.logout()
            .then(res => {
                if (res) {
                    removeSessionStorage('token');
                    this.props.history.push(Routes.Login)
                }
            })
    };

    renderNavItems = () => {
        return (
            <>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink
                            to={Routes.Home}
                            className="nav-link"
                            activeClassName='active'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to={Routes.Topics}
                            className="nav-link"
                            activeClassName='active'>Topics</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to={Routes.Projects}
                            className="nav-link"
                            activeClassName='active'>Projects</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to={Routes.Profile}
                            className="nav-link"
                            activeClassName='active'>Profile</NavLink>
                    </li>
                </ul>
                <button onClick={this.attemptLogout} type="button" className="btn btn-info">Logout</button>
            </>
        )
    };

    render() {
        return (
            <div className="fixed-top">
                <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                    { this.renderNavItems() }
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
     logout: () => dispatch(logout())
    }
);

export default withRouter(connect(null, mapDispatchToProps)(Header));
