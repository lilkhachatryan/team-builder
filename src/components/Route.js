import React from "react";
import {
    Route as ReactRoute,
    Redirect
} from "react-router-dom";
import { getSessionStorage } from "../utils/storage";
import { Routes } from "../Router";
import {setupInterceptors} from "../plugins/axios";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import { getUser } from "../actions/user";
import {connect} from "react-redux";


const Route = ({ guard, component: Component, fetchUser, user, ...rest}) => {
    let isLoggedIn = !!getSessionStorage('token');
    setupInterceptors(rest.history);

    if (guard) {
        if (isLoggedIn) {
            if (rest.path === Routes.Root) {
                return <Redirect to={Routes.Home}/>
            }

            if (!Object.keys(user).length) {
                fetchUser()
                    // .then(res => {
                    //     console.log('thennnnnn', res);
                    //     return (
                    //         <>
                    //             <Header />
                    //             <ReactRoute {...rest} component={Component} />
                    //         </>
                    //     );
                    // })
            }

            return (
                <>
                    <Header />
                    <ReactRoute {...rest} component={Component} />
                </>
            );
        }
        return <Redirect to={Routes.Login} />
    } else if (isLoggedIn) {
        return <Redirect to={Routes.Home} />;
    }

    return <ReactRoute component={Component} {...rest} />
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(getUser())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Route));
